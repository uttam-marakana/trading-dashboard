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

  if (!entry || !exit) return 0;

  const buyValue = entry * 65;
  const sellValue = exit * 65;

  const brokerage = 40;
  const exchange = (buyValue + sellValue) * 0.000035;
  const sebi = (buyValue + sellValue) * 0.000001;
  const stt = sellValue * 0.0005;
  const stamp = buyValue * 0.00003;
  const gst = (brokerage + exchange) * 0.18;

  return Number((brokerage + exchange + sebi + stt + stamp + gst).toFixed(2));
};

export const calculateSummary = (trades) => {
  let totalPnL = 0;
  let totalCharges = 0;

  trades.forEach((t) => {
    const pnl = (t.exit - t.entry) * LOT_SIZE;
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
