import { LIMITS } from "../utils/constants";

export function checkDiscipline(session) {
  const { tradesToday, pnlToday } = session;

  if (tradesToday >= LIMITS.MAX_TRADES) {
    return { allowed: false, reason: "Max trades reached" };
  }

  if (pnlToday <= -LIMITS.MAX_LOSS) {
    return { allowed: false, reason: "Loss limit hit" };
  }

  if (pnlToday >= LIMITS.MAX_PROFIT) {
    return { allowed: false, reason: "Target reached" };
  }

  // Soft rule → cooldown
  if (pnlToday < 0 && tradesToday >= 2) {
    return { allowed: false, reason: "Cooldown required" };
  }

  return { allowed: true };
}
