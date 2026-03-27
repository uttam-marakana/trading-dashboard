export function detectMarketType(data) {
  if (!data || data.length < 5) return "UNKNOWN";

  const range = Math.max(...data) - Math.min(...data);

  if (range < 0.3) return "RANGE";
  if (range > 1) return "VOLATILE";

  return "TREND";
}
