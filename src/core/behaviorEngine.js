import { calculatePnL } from "../utils/calculations";

export function behaviorEngine(trade, trades = []) {
  const warnings = [];

  const last2 = trades.slice(0, 2);
  const lossStreak = last2.filter((t) => calculatePnL(t) < 0);

  if (lossStreak.length === 2) {
    return { allowed: false, reason: "Revenge trading detected" };
  }

  // Only warning (NOT blocking here)
  if (trade.confidence <= 2) {
    warnings.push("Low confidence trade");
  }

  const recentMistakes = trades
    .slice(0, 5)
    .filter((t) => t.mistake && t.mistake !== "None");

  if (recentMistakes.length >= 2) {
    return { allowed: false, reason: "Repeated mistakes pattern" };
  }

  return { allowed: true, warnings };
}
