import { calculatePnL } from "../utils/calculations";

export function patternEngine(trades = []) {
  if (!trades.length) return {};

  const patterns = {
    lossStreak: 0,
    bestStrategy: null,
    worstHour: null,
  };

  // LOSS STREAK
  let streak = 0;
  for (let t of trades) {
    if (calculatePnL(t) < 0) streak++;
    else break;
  }
  patterns.lossStreak = streak;

  // 📊 STRATEGY PERFORMANCE
  const stratMap = {};
  trades.forEach((t) => {
    if (!stratMap[t.strategy]) stratMap[t.strategy] = 0;
    stratMap[t.strategy] += calculatePnL(t);
  });

  patterns.bestStrategy = Object.keys(stratMap).sort(
    (a, b) => stratMap[b] - stratMap[a],
  )[0];

  // ⏱ TIME ANALYSIS
  const hourMap = {};
  trades.forEach((t) => {
    const h = new Date(t.date).getHours();
    if (!hourMap[h]) hourMap[h] = 0;
    hourMap[h] += calculatePnL(t);
  });

  patterns.worstHour = Object.keys(hourMap).sort(
    (a, b) => hourMap[a] - hourMap[b],
  )[0];

  return patterns;
}
