import { calculateRisk } from "./riskManager";
import { checkDiscipline } from "./disciplineManager";
import { validateTrade } from "./tradeValidator";
import { calculatePnL, calculateNetPnL, calculateRR } from "../utils/calculations";
import { behaviorEngine } from "./behaviorEngine";
import { patternEngine } from "./patternEngine";
import { LIMITS } from "../utils/constants";

function normalizeTrade(trade) {
  const entry = Number(trade?.entry);
  const exit = Number(trade?.exit);
  const sl = Number(trade?.sl);
  const qty = Number(trade?.qty);
  const strike = trade?.strike != null ? String(trade.strike) : "";

  return {
    ...trade,
    entry,
    exit,
    sl,
    qty,
    strike,
    confidence: Number(trade?.confidence),
    premium: trade?.premium ?? "",
    strategy: trade?.strategy ?? "",
    mistake: trade?.mistake ?? "None",
    type: trade?.type,
    date: trade?.date,
  };
}

export function executionEngine(trade, session) {
  const normalizedTrade = normalizeTrade(trade);

  // 1. Discipline
  const discipline = checkDiscipline(session);
  if (!discipline.allowed) {
    return {
      allowed: false,
      reason: discipline.reason,
      details: { stage: "discipline" },
    };
  }

  // 2. Validation
  const validation = validateTrade(normalizedTrade);
  if (!validation.valid) {
    return {
      allowed: false,
      reason: validation.reason,
      details: { stage: "validation" },
    };
  }

  // 3. Behavior
  const behavior = behaviorEngine(normalizedTrade, session.history || []);
  if (!behavior.allowed) {
    return {
      allowed: false,
      reason: behavior.reason,
      details: { stage: "behavior" },
    };
  }

  // 4. Pattern
  const patterns = patternEngine(session.history || []);

  if (patterns.lossStreak >= 2) {
    return {
      allowed: false,
      reason: "Cooldown: loss streak",
      details: { stage: "pattern", lossStreak: patterns.lossStreak },
    };
  }

  const tradeHour = new Date(normalizedTrade.date || Date.now()).getHours();

  if (patterns.worstHour !== null && tradeHour == patterns.worstHour) {
    return {
      allowed: false,
      reason: "Avoid this trading hour",
      details: { stage: "pattern", worstHour: patterns.worstHour },
    };
  }

  // 5. Risk
  const risk = calculateRisk(normalizedTrade);
  if (risk > LIMITS.MAX_RISK_PER_TRADE) {
    return {
      allowed: false,
      reason: `Risk exceeds limit (>${LIMITS.MAX_RISK_PER_TRADE})`,
      details: { stage: "risk", risk, max: LIMITS.MAX_RISK_PER_TRADE },
    };
  }

  // 6. Confidence (FINAL AUTHORITY)
  if (normalizedTrade.confidence <= 2) {
    return {
      allowed: false,
      reason: "Low confidence trade",
      details: { stage: "confidence", confidence: normalizedTrade.confidence },
    };
  }

  // 7. PnL + enriched metrics
  const pnl = calculatePnL(normalizedTrade);
  const netPnL = calculateNetPnL(normalizedTrade);
  const rr = calculateRR(normalizedTrade);

  return {
    allowed: true,
    warnings: behavior.warnings || [],
    trade: {
      ...normalizedTrade,
      pnl,
      netPnL,
      risk,
      rr,
      timestamp: Date.now(),
      followedRules: true,
      patternTag: patterns.bestStrategy || null,
    },
  };
}

