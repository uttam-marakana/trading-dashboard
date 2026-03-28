import { calculatePnL } from "../utils/calculations";

export function patternEngine(trades = []) {
  if (!trades.length) {
    return {
      lossStreak: 0,
      bestStrategy: null,
      worstHour: null,
    };
  }

  let streak = 0;
  for (let t of trades) {
    if (calculatePnL(t) < 0) streak++;
    else break;
  }

  const stratMap = {};
  trades.forEach((t) => {
    if (!t.strategy) return;
    stratMap[t.strategy] = (stratMap[t.strategy] || 0) + calculatePnL(t);
  });

  const bestStrategy =
    Object.keys(stratMap).sort((a, b) => stratMap[b] - stratMap[a])[0] || null;

  const hourMap = {};
  trades.forEach((t) => {
    if (!t.date) return;
    const h = new Date(t.date).getHours();
    hourMap[h] = (hourMap[h] || 0) + calculatePnL(t);
  });

  const worstHour = Object.keys(hourMap).length
    ? Object.keys(hourMap).sort((a, b) => hourMap[a] - hourMap[b])[0]
    : null;

  return {
    lossStreak: streak,
    bestStrategy,
    worstHour,
  };
}
