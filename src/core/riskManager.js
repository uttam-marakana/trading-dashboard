import { LIMITS } from "../utils/constants";

export function calculateRisk(trade) {
  const { entry, sl, qty } = trade;

  if (!entry || !sl || !qty) return Infinity;

  const riskPerUnit = Math.abs(entry - sl);
  return riskPerUnit * qty;
}

export function validateRisk(trade) {
  const risk = calculateRisk(trade);

  if (risk > LIMITS.MAX_RISK) {
    return {
      allowed: false,
      reason: `Risk exceeds ₹${LIMITS.MAX_RISK}`,
      risk,
    };
  }

  return { allowed: true, risk };
}
