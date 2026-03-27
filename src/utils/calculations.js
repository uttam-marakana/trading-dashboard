const BROKERAGE_PER_ORDER = 20;
const GST_RATE = 0.18;
const STT_RATE = 0.0005;
const EXCHANGE_RATE = 0.000035;
const SEBI_RATE = 0.000001;
const STAMP_RATE = 0.00003;

const LOT_SIZE = 65;
const DAILY_LOSS_LIMIT = 600;

export const calculateCharges = (trade) => {
  const entry = Number(trade.entry || 0);
  const exit = Number(trade.exit || 0);
  const qty = Number(trade.qty || 1);

  if (!entry || !exit) return 0;

  const buyValue = entry * LOT_SIZE * qty;
  const sellValue = exit * LOT_SIZE * qty;

  const brokerage = BROKERAGE_PER_ORDER * 2;
  const exchange = (buyValue + sellValue) * EXCHANGE_RATE;
  const sebi = (buyValue + sellValue) * SEBI_RATE;
  const stt = sellValue * STT_RATE;
  const stamp = buyValue * STAMP_RATE;
  const gst = (brokerage + exchange) * GST_RATE;

  return Number((brokerage + exchange + sebi + stt + stamp + gst).toFixed(2));
};

export const calculatePnL = (trade) => {
  const { entry = 0, exit = 0, qty = 1 } = trade;
  return (exit - entry) * LOT_SIZE * qty;
};

export const calculateSummary = (trades) => {
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
    isLossLimitHit: netPnL <= -DAILY_LOSS_LIMIT,
  };
};
