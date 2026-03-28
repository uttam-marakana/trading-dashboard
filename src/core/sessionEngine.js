import { calculateSummary } from "../utils/calculations";
import {
  MAX_TRADES_PER_DAY,
  DAILY_PROFIT_TARGET,
  DAILY_LOSS_LIMIT,
} from "./constants";

export function createSession(trades) {
  const today = new Date().toDateString();

  const todayTrades = trades.filter(
    (t) => new Date(t.date).toDateString() === today,
  );

  const summary = calculateSummary(todayTrades);

  const isLocked =
    todayTrades.length >= MAX_TRADES_PER_DAY ||
    summary.netPnL <= -DAILY_LOSS_LIMIT ||
    summary.netPnL >= DAILY_PROFIT_TARGET;

  return {
    tradesToday: todayTrades.length,
    pnlToday: summary.netPnL,
    isLocked,
    todayTrades,
    summary,
  };
}
