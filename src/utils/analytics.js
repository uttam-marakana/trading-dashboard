const LOT_SIZE = 65;

export const getStrategyStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    const strategy = t.strategy || "Unknown";
    const pnl = (t.exit - t.entry) * LOT_SIZE;

    if (!stats[strategy]) {
      stats[strategy] = { pnl: 0, trades: 0 };
    }

    stats[strategy].pnl += pnl;
    stats[strategy].trades++;
  });

  return stats;
};

export const getTimeStats = (trades) => {
  const stats = {};

  trades.forEach((t) => {
    const hour = new Date(t.date).getHours();
    const pnl = (t.exit - t.entry) * LOT_SIZE;

    if (!stats[hour]) {
      stats[hour] = { pnl: 0, trades: 0 };
    }

    stats[hour].pnl += pnl;
    stats[hour].trades++;
  });

  return stats;
};

/* PERFORMANCE */
export const getPerformanceStats = (trades) => {
  let wins = 0;
  let losses = 0;
  let totalWin = 0;
  let totalLoss = 0;

  trades.forEach((t) => {
    const pnl = (t.exit - t.entry) * LOT_SIZE;

    if (pnl > 0) {
      wins++;
      totalWin += pnl;
    } else if (pnl < 0) {
      losses++;
      totalLoss += pnl;
    }
  });

  const totalTrades = trades.length;

  const winRate = totalTrades ? (wins / totalTrades) * 100 : 0;
  const avgWin = wins ? totalWin / wins : 0;
  const avgLoss = losses ? totalLoss / losses : 0;

  const expectancy =
    totalTrades > 0
      ? (winRate / 100) * avgWin + (1 - winRate / 100) * avgLoss
      : 0;

  return { winRate, avgWin, avgLoss, expectancy };
};

/* AI INSIGHTS */
export const getAIInsights = (trades) => {
  const insights = [];

  if (trades.length === 0) {
    return ["No trades yet"];
  }

  if (trades.length < 3) {
    return ["Not enough data yet"];
  }

  const performance = getPerformanceStats(trades);

  if (performance.winRate < 40) {
    insights.push("Low win rate → improve entries");
  }

  if (performance.expectancy < 0) {
    insights.push("System losing money → stop & review");
  }

  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) {
    insights.push("Avoid switching CE/PE direction frequently");
  }

  if (trades.length > 3) {
    insights.push("Overtrading detected");
  }

  return insights.length ? insights : ["System looks stable"];
};
