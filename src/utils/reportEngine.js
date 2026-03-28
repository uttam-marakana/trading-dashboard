import { calculatePnL } from "./calculations";

export const generateReport = (trades) => {
  const total = trades.length;

  const wins = trades.filter((t) => calculatePnL(t) > 0).length;
  const losses = trades.filter((t) => calculatePnL(t) < 0).length;

  const mistakes = trades.filter(
    (t) => t.mistake && t.mistake !== "None",
  ).length;

  return {
    totalTrades: total,
    winRate: total ? ((wins / total) * 100).toFixed(1) : 0,
    lossRate: total ? ((losses / total) * 100).toFixed(1) : 0,
    mistakeRate: total ? ((mistakes / total) * 100).toFixed(1) : 0,
  };
};
