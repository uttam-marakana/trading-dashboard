import { calculateSummary } from "../utils/calculations";
import { LIMITS } from "../utils/constants";

export function createSession(trades) {
  const today = new Date().toDateString();

  const todayTrades = trades.filter(
    (t) => new Date(t.date).toDateString() === today,
  );

  const summary = calculateSummary(todayTrades);

  return {
    tradesToday: todayTrades.length,
    pnlToday: summary.netPnL,
    history: trades,
    todayTrades,
    summary,
  };
}
