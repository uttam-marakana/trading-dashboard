export function checkDiscipline(session) {
  const { tradesToday, pnlToday, isLocked } = session;

  if (isLocked) {
    return { allowed: false, reason: "Trading locked" };
  }

  if (tradesToday >= 3) {
    return { allowed: false, reason: "Max trades reached" };
  }

  if (pnlToday <= -600) {
    return { allowed: false, reason: "Daily loss limit hit" };
  }

  if (pnlToday >= 1200) {
    return { allowed: false, reason: "Target reached" };
  }

  return { allowed: true };
}
