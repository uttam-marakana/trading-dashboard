import { calculateRisk } from "./riskManager";
import { checkDiscipline } from "./disciplineManager";
import { validateTrade } from "./tradeValidator";

export function executionEngine(trade, session) {
  // 1. Discipline check
  const discipline = checkDiscipline(session);
  if (!discipline.allowed) {
    return { allowed: false, reason: discipline.reason };
  }

  // 2. Trade validation
  const validation = validateTrade(trade);
  if (!validation.valid) {
    return { allowed: false, reason: validation.reason };
  }

  // 3. Risk check
  const risk = calculateRisk(trade);
  if (risk > 300) {
    return { allowed: false, reason: "Risk exceeds ₹300" };
  }

  // 4. Final trade object
  return {
    allowed: true,
    trade: {
      ...trade,
      risk,
      timestamp: Date.now(),
      followedRules: true,
    },
  };
}
