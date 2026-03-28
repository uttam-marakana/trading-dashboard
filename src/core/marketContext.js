export function detectMarketType(data = []) {
  if (!data.length) return "UNKNOWN";

  const range = Math.max(...data) - Math.min(...data);

  if (range < 0.3) return "RANGE";
  if (range > 1) return "VOLATILE";

  return "TREND";
}

export function marketContextFilter(trade, marketType) {
  // Example logic (expand later)

  if (marketType === "RANGE" && trade.strategy === "BREAKOUT") {
    return {
      allowed: false,
      reason: "Breakout strategy in range market",
    };
  }

  return { allowed: true };
}
