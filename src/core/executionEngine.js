import { calculateRisk } from "./riskManager";
import { checkDiscipline } from "./disciplineManager";
import { validateTrade } from "./tradeValidator";
import { calculatePnL } from "../utils/calculations";
import { behaviorEngine } from "./behaviorEngine";
import { patternEngine } from "./patternEngine";

export function executionEngine(trade, session) {
  // 1. Discipline
  const discipline = checkDiscipline(session);
  if (!discipline.allowed) {
    return { allowed: false, reason: discipline.reason };
  }

  // 2. Validation
  const validation = validateTrade(trade);
  if (!validation.valid) {
    return { allowed: false, reason: validation.reason };
  }

  // 3. Behavior
  const behavior = behaviorEngine(trade, session.history || []);
  if (!behavior.allowed) {
    return { allowed: false, reason: behavior.reason };
  }

  // 4. Pattern control
  const patterns = patternEngine(session.history || []);

  if (patterns.lossStreak >= 2) {
    return { allowed: false, reason: "Cooldown: loss streak" };
  }

  if (patterns.worstHour && trade.hour === patterns.worstHour) {
    return { allowed: false, reason: "Avoid this trading hour" };
  }

  // 5. Risk
  const risk = calculateRisk(trade);
  if (risk > 600) {
    return { allowed: false, reason: "Risk > ₹600" };
  }

  // 6. Confidence
  if (trade.confidence <= 2) {
    return { allowed: false, reason: "Low confidence trade" };
  }

  // 7. PnL
  const pnl = calculatePnL(trade);

  return {
    allowed: true,
    warnings: behavior.warnings || [],
    trade: {
      ...trade,
      pnl,
      risk,
      timestamp: Date.now(),
      followedRules: true,
      patternTag: patterns.bestStrategy || null,
    },
  };
}
