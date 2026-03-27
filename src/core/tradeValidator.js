export function validateTrade(trade) {
  const { entry, sl, type, strategy } = trade;

  if (!entry || !sl) {
    return { valid: false, reason: "Missing entry or SL" };
  }

  if (!["CE", "PE"].includes(type)) {
    return { valid: false, reason: "Invalid option type" };
  }

  if (!strategy) {
    return { valid: false, reason: "Strategy not selected" };
  }

  if (entry === sl) {
    return { valid: false, reason: "Invalid SL (same as entry)" };
  }

  return { valid: true };
}
