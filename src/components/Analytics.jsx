import {
  getStrategyStats,
  getTimeStats,
  getPerformanceStats,
  getAIInsights,
} from "../utils/analytics";

const Analytics = ({ trades }) => {
  const strategyStats = getStrategyStats(trades);
  const timeStats = getTimeStats(trades);
  const performance = getPerformanceStats(trades);
  const insights = getAIInsights(trades);

  const sortedHours = Object.keys(timeStats).sort((a, b) => a - b);

  return (
    <div className="card p-3">
      <h6>Analytics</h6>

      {/* EMPTY STATE */}
      {trades.length === 0 && (
        <div className="text-muted small">No data yet</div>
      )}

      {/* STRATEGY */}
      {Object.keys(strategyStats).length > 0 && (
        <div className="mb-3">
          <strong>Strategy Performance</strong>

          {Object.entries(strategyStats).map(([key, val]) => (
            <div key={key} className="small d-flex justify-content-between">
              <span>{key}</span>
              <span className={val.pnl >= 0 ? "text-success" : "text-danger"}>
                ₹{val.pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TIME */}
      {sortedHours.length > 0 && (
        <div className="mb-3">
          <strong>Time Performance</strong>

          {sortedHours.map((key) => (
            <div key={key} className="small d-flex justify-content-between">
              <span>{key}:00</span>
              <span
                className={
                  timeStats[key].pnl >= 0 ? "text-success" : "text-danger"
                }
              >
                ₹{timeStats[key].pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* PERFORMANCE */}
      {trades.length > 0 && (
        <div className="mb-3">
          <strong>Performance</strong>

          <div className="small">
            Win Rate: {performance.winRate.toFixed(1)}%
          </div>

          <div className="small text-success">
            Avg Win: ₹{performance.avgWin.toFixed(2)}
          </div>

          <div className="small text-danger">
            Avg Loss: ₹{performance.avgLoss.toFixed(2)}
          </div>

          <div className="small">
            Expectancy: ₹{performance.expectancy.toFixed(2)}
          </div>
        </div>
      )}

      {/* INSIGHTS */}
      <div>
        <strong>AI Insights</strong>

        {insights.map((i, idx) => (
          <div key={idx} className="small text-warning">
            ⚠ {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
