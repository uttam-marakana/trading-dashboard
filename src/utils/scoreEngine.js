import { calculateNetPnL, calculateRR } from "./calculations";
import { LIMITS } from "./constants";

/* ===============================
   🎯 DISCIPLINE SCORE
================================= */
export const getDisciplineScore = (trades = []) => {
  if (!trades.length) return 10;

  let score = 10;

  // Overtrading (daily system assumed)
  if (trades.length > LIMITS.MAX_TRADES) score -= 3;

  // Net loss control
  const totalPnL = trades.reduce((sum, t) => sum + calculateNetPnL(t), 0);

  if (totalPnL <= -LIMITS.MAX_LOSS) score -= 3;

  // Direction switching
  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) score -= 2;

  // Mistakes
  const mistakeCount = trades.filter(
    (t) => t.mistake && t.mistake !== "None",
  ).length;

  if (mistakeCount > 0) score -= 2;

  return Math.max(score, 0);
};

/* ===============================
   📊 TRADE QUALITY SCORE
================================= */
export const getTradeQualityScore = (trade) => {
  if (!trade) return 0;

  let score = 10;

  const pnl = calculateNetPnL(trade);
  const rr = calculateRR(trade);

  // Risk control
  if (trade.risk && trade.risk > LIMITS.MAX_RISK) {
    score -= 3;
  }

  // RR quality (KEY EDGE)
  if (rr < 1) score -= 3;
  else if (rr < 1.5) score -= 1;

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
    score -= 1; // softer penalty (loss ≠ bad trade always)
  }

  return Math.max(score, 0);
};
