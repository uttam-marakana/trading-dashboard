export function validateTrade(trade) {
  if (!trade) return { valid: false, reason: "Trade missing" };

  const { entry, sl, type, strategy, qty } = trade;

  if (!entry || !sl || !qty) {
    return { valid: false, reason: "Missing required fields" };
  }

  if (entry <= 0 || sl <= 0 || qty <= 0) {
    return { valid: false, reason: "Invalid numeric values" };
  }

  if (!["CE", "PE"].includes(type)) {
    return { valid: false, reason: "Invalid option type" };
  }

  if (!strategy) {
    return { valid: false, reason: "Strategy required" };
  }

  if (entry === sl) {
    return { valid: false, reason: "SL cannot equal entry" };
  }

  return { valid: true };
}
