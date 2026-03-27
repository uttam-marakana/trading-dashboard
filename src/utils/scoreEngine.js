import { calculatePnL } from "./calculations";
import { LIMITS } from "./constants";

/* 🎯 DISCIPLINE SCORE */
export const getDisciplineScore = (trades) => {
  if (!trades || trades.length === 0) return 10;

  let score = 10;

  // Overtrading
  if (trades.length > LIMITS.MAX_TRADES) score -= 3;

  // Loss limit breach (NET behavior)
  const totalPnL = trades.reduce((sum, t) => {
    return sum + calculatePnL(t);
  }, 0);

  if (totalPnL <= -LIMITS.MAX_LOSS) score -= 3;

  // Direction switching
  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) score -= 2;

  // Mistakes tracking
  const mistakeCount = trades.filter(
    (t) => t.mistake && t.mistake !== "None",
  ).length;

  if (mistakeCount > 0) score -= 2;

  return Math.max(score, 0);
};

/* 📊 TRADE QUALITY SCORE */
export const getTradeQualityScore = (trade) => {
  if (!trade) return 0;

  let score = 10;

  const pnl = calculatePnL(trade);

  // Risk control (safe check)
  if (trade.risk && trade.risk > LIMITS.MAX_RISK_PER_TRADE) {
    score -= 3;
  }

  // Confidence
  if (trade.confidence && trade.confidence <= 2) {
    score -= 2;
  }

  // Mistake penalty
  if (trade.mistake && trade.mistake !== "None") {
    score -= 3;
  }

  // Loss penalty
  if (pnl < 0) {
    score -= 2;
  }

  return Math.max(score, 0);
};
