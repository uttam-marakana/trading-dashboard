import { calculatePnL } from "./calculations";
import { LIMITS } from "./constants";

/* STRATEGY */
export const getStrategyStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    const key = t.strategy || "Unknown";
    const pnl = calculatePnL(t);

    if (!stats[key]) stats[key] = { pnl: 0, trades: 0 };

    stats[key].pnl += pnl;
    stats[key].trades++;
  });

  return stats;
};

/* TIME */
export const getTimeStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    const hour = new Date(t.date).getHours();
    const pnl = calculatePnL(t);

    if (!stats[hour]) stats[hour] = { pnl: 0, trades: 0 };

    stats[hour].pnl += pnl;
    stats[hour].trades++;
  });

  return stats;
};

/* PERFORMANCE */
export const getPerformanceStats = (trades) => {
  let wins = 0,
    losses = 0,
    totalWin = 0,
    totalLoss = 0;

  trades.forEach((t) => {
    const pnl = calculatePnL(t);

    if (pnl > 0) {
      wins++;
      totalWin += pnl;
    } else if (pnl < 0) {
      losses++;
      totalLoss += pnl;
    }
  });

  const total = trades.length;

  const winRate = total ? (wins / total) * 100 : 0;
  const avgWin = wins ? totalWin / wins : 0;
  const avgLoss = losses ? totalLoss / losses : 0;

  const expectancy =
    total > 0 ? (winRate / 100) * avgWin + (1 - winRate / 100) * avgLoss : 0;

  return { winRate, avgWin, avgLoss, expectancy };
};

/* EXPECTANCY */
export const calculateExpectancy = (trades) => {
  return getPerformanceStats(trades).expectancy;
};

/* MISTAKE STATS (NEW) */
export const getMistakeStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    if (!t.mistake || t.mistake === "None") return;
    stats[t.mistake] = (stats[t.mistake] || 0) + 1;
  });

  return stats;
};

/* AI INSIGHTS */
export const getAIInsights = (trades) => {
  const insights = [];

  if (trades.length === 0) return ["No trades yet"];
  if (trades.length < 3) return ["Not enough data yet"];

  const perf = getPerformanceStats(trades);

  // Core signals
  if (perf.winRate < 40) insights.push("Low win rate → improve entries");

  if (perf.expectancy < 0)
    insights.push("System losing money → review strategy");

  // Direction discipline
  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) insights.push("Avoid CE/PE switching");

  // Overtrading
  if (trades.length > LIMITS.MAX_TRADES) insights.push("Overtrading detected");

  // Loss cluster
  const losses = trades.filter((t) => calculatePnL(t) < 0);
  if (losses.length >= 2)
    insights.push("Multiple losses → reduce size or stop");

  // Risk violation
  const risky = trades.filter(
    (t) => t.risk && t.risk > LIMITS.MAX_RISK_PER_TRADE,
  );
  if (risky.length) insights.push("High risk trades → tighten SL");

  // Behavior layer
  const lowConfidence = trades.filter((t) => t.confidence <= 2);
  if (lowConfidence.length) insights.push("Low confidence trades detected");

  const mistakes = getMistakeStats(trades);
  if (Object.keys(mistakes).length)
    insights.push("Repeated mistakes → review behavior");

  return insights.length ? insights : ["System looks stable"];
};
