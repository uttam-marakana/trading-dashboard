import { calculateNetPnL, calculateRR } from "./calculations";
import { LIMITS } from "./constants";

/* ===============================
   📊 STRATEGY STATS
================================= */
export const getStrategyStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    const key = t.strategy || "Unknown";
    const pnl = calculateNetPnL(t);

    if (!stats[key]) stats[key] = { pnl: 0, trades: 0 };

    stats[key].pnl += pnl;
    stats[key].trades++;
  });

  return stats;
};

/* ===============================
   ⏱ TIME STATS
================================= */
export const getTimeStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    if (!t.date) return;

    const hour = new Date(t.date).getHours();
    const pnl = calculateNetPnL(t);

    if (!stats[hour]) stats[hour] = { pnl: 0, trades: 0 };

    stats[hour].pnl += pnl;
    stats[hour].trades++;
  });

  return stats;
};

/* ===============================
   📈 PERFORMANCE
================================= */
export const getPerformanceStats = (trades) => {
  let wins = 0,
    losses = 0,
    totalWin = 0,
    totalLoss = 0,
    totalRR = 0;

  trades.forEach((t) => {
    const pnl = calculateNetPnL(t);
    const rr = calculateRR(t);

    totalRR += rr;

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

  const avgRR = total ? totalRR / total : 0;

  return { winRate, avgWin, avgLoss, expectancy, avgRR };
};

/* ===============================
   🎯 EXPECTANCY
================================= */
export const calculateExpectancy = (trades) => {
  return getPerformanceStats(trades).expectancy;
};

/* ===============================
   ❌ MISTAKE STATS
================================= */
export const getMistakeStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    if (!t.mistake || t.mistake === "None") return;
    stats[t.mistake] = (stats[t.mistake] || 0) + 1;
  });

  return stats;
};

/* ===============================
   🧠 AI INSIGHTS
================================= */
export const getAIInsights = (trades) => {
  const insights = [];

  if (trades.length === 0) return ["No trades yet"];
  if (trades.length < 3) return ["Not enough data yet"];

  const perf = getPerformanceStats(trades);

  if (perf.winRate < 40) insights.push("Low win rate → improve entries");

  if (perf.expectancy < 0)
    insights.push("System losing money → review strategy");

  if (perf.avgRR < 1) insights.push("Low RR trades → improve risk-reward");

  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) insights.push("Avoid CE/PE switching");

  const losses = trades.filter((t) => calculateNetPnL(t) < 0);
  if (losses.length >= 2) insights.push("Multiple losses → reduce size");

  const risky = trades.filter((t) => t.risk && t.risk > LIMITS.MAX_RISK);
  if (risky.length) insights.push("High risk trades → tighten SL");

  const lowConfidence = trades.filter((t) => t.confidence <= 2);
  if (lowConfidence.length) insights.push("Low confidence trades detected");

  const mistakes = getMistakeStats(trades);
  if (Object.keys(mistakes).length)
    insights.push("Repeated mistakes → review behavior");

  return insights.length ? insights : ["System looks stable"];
};
