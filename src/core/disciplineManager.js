import { LIMITS } from "../utils/constants";

export function checkDiscipline(session) {
  const { tradesToday, pnlToday, isLocked } = session;

  if (isLocked) return { allowed: false, reason: "Locked" };
  if (tradesToday >= LIMITS.MAX_TRADES)
    return { allowed: false, reason: "Max trades reached" };

  if (pnlToday <= -LIMITS.MAX_LOSS)
    return { allowed: false, reason: "Loss limit hit" };

  if (pnlToday < 0 && tradesToday >= 2) {
    return { allowed: false, reason: "Cooldown Required" };
  }

  if (pnlToday >= LIMITS.MAX_PROFIT)
    return { allowed: false, reason: "Target reached" };

  return { allowed: true };
}
