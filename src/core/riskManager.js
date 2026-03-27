export function calculateRisk(trade) {
  const { entry, sl, qty } = trade;

  if (!entry || !sl || !qty) return Infinity;

  const riskPerUnit = Math.abs(entry - sl);
  return riskPerUnit * qty;
}
