import {
  getStrategyStats,
  getTimeStats,
  getPerformanceStats,
} from "../utils/analytics";

const Analytics = ({ trades }) => {
  const strategyStats = getStrategyStats(trades);
  const timeStats = getTimeStats(trades);
  const performance = getPerformanceStats(trades);

  const sortedHours = Object.keys(timeStats).sort((a, b) => a - b);

  return (
    <div className="card p-3">
      <h6>Analytics</h6>

      {trades.length === 0 && (
        <div className="text-muted small">No data yet</div>
      )}

      {/* Strategy */}
      {Object.keys(strategyStats).length > 0 && (
        <div>
          <strong>Strategy</strong>
          {Object.entries(strategyStats).map(([key, val]) => (
            <div key={key} className="flex justify-between small">
              <span>{key}</span>
              <span className={val.pnl >= 0 ? "text-profit" : "text-loss"}>
                ₹{val.pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Time */}
      {sortedHours.length > 0 && (
        <div>
          <strong>Time</strong>
          {sortedHours.map((key) => (
            <div key={key} className="flex justify-between small">
              <span>{key}:00</span>
              <span
                className={
                  timeStats[key].pnl >= 0 ? "text-profit" : "text-loss"
                }
              >
                ₹{timeStats[key].pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Performance */}
      {trades.length > 0 && (
        <div>
          <strong>Performance</strong>
          <div className="small">
            Win Rate: {performance.winRate.toFixed(1)}%
          </div>
          <div className="small text-profit">
            Avg Win: ₹{performance.avgWin.toFixed(2)}
          </div>
          <div className="small text-loss">
            Avg Loss: ₹{performance.avgLoss.toFixed(2)}
          </div>
          <div className="small">
            Expectancy: ₹{performance.expectancy.toFixed(2)}
          </div>
          <div className="small">Avg RR: {performance.avgRR.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
