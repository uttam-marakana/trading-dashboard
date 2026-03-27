import { calculateRisk } from "./riskManager";
import { checkDiscipline } from "./disciplineManager";
import { validateTrade } from "./tradeValidator";
import { calculatePnL } from "../utils/calculations";

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

  // 3. Risk enforcement
  const risk = calculateRisk(trade);
  if (risk > 300) {
    return { allowed: false, reason: "Risk exceeds ₹300" };
  }

  // 4. Optional behavior enforcement (NEW EDGE)
  if (trade.confidence <= 2) {
    return { allowed: false, reason: "Low confidence trade blocked" };
  }

  // 5. PnL
  const pnl = calculatePnL(trade);

  // 6. Final trade
  return {
    allowed: true,
    trade: {
      ...trade,
      pnl,
      risk,
      timestamp: Date.now(),
      followedRules: true,
    },
  };
}
