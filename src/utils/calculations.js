import { LIMITS } from "./constants";

/* ===============================
   💸 CHARGES
================================= */
const BROKERAGE_PER_ORDER = 20;
const GST_RATE = 0.18;
const STT_RATE = 0.0005;
const EXCHANGE_RATE = 0.000035;
const SEBI_RATE = 0.000001;
const STAMP_RATE = 0.00003;

export const calculateCharges = (trade) => {
  const entry = Number(trade.entry || 0);
  const exit = Number(trade.exit || 0);
  const qty = Number(trade.qty || 1);

  if (!entry || !exit) return 0;

  const buyValue = entry * LIMITS.LOT_SIZE * qty;
  const sellValue = exit * LIMITS.LOT_SIZE * qty;

  const brokerage = BROKERAGE_PER_ORDER * 2;
  const exchange = (buyValue + sellValue) * EXCHANGE_RATE;
  const sebi = (buyValue + sellValue) * SEBI_RATE;
  const stt = sellValue * STT_RATE;
  const stamp = buyValue * STAMP_RATE;
  const gst = (brokerage + exchange) * GST_RATE;

  return Number((brokerage + exchange + sebi + stt + stamp + gst).toFixed(2));
};

/* ===============================
   📈 RAW PnL
================================= */
export const calculatePnL = (trade) => {
  const entry = Number(trade.entry || 0);
  const exit = Number(trade.exit || 0);
  const qty = Number(trade.qty || 1);

  if (!entry || !exit) return 0;

  return (exit - entry) * LIMITS.LOT_SIZE * qty;
};

/* ===============================
   📊 NET PnL
================================= */
export const calculateNetPnL = (trade) => {
  const pnl = calculatePnL(trade);
  const charges = calculateCharges(trade);
  return pnl - charges;
};

/* ===============================
   🎯 RISK-REWARD (RR)
================================= */
export const calculateRR = (trade) => {
  const entry = Number(trade.entry || 0);
  const sl = Number(trade.sl || 0);
  const exit = Number(trade.exit || 0);

  if (!entry || !sl || !exit) return 0;

  const risk = Math.abs(entry - sl);
  const reward = Math.abs(exit - entry);

  if (!risk) return 0;

  return Number((reward / risk).toFixed(2));
};

/* ===============================
   📊 SUMMARY
================================= */
export const calculateSummary = (trades = []) => {
  let totalPnL = 0;
  let totalCharges = 0;

  trades.forEach((t) => {
    const pnl = calculatePnL(t);
    const charges = calculateCharges(t);

    totalPnL += pnl;
    totalCharges += charges;
  });

  const netPnL = totalPnL - totalCharges;

  return {
    totalPnL,
    totalCharges,
    netPnL,
    totalTrades: trades.length,
    isLossLimitHit: netPnL <= -LIMITS.MAX_LOSS,
  };
};
