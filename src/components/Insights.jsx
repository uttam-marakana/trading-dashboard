import { getAIInsights } from "../utils/analytics";

const Insights = ({ trades }) => {
  const insights = getAIInsights(trades);

  return (
    <div className="card p-3">
      <h6>AI Insights</h6>

      {trades.length === 0 && (
        <div className="text-muted small">
          No trades yet. Start logging to generate insights.
        </div>
      )}

      {trades.length > 0 && (
        <>
          {insights.length === 0 ? (
            <div className="text-profit small">✔ System stable</div>
          ) : (
            insights.map((i, idx) => (
              <div key={idx} className="small text-warning">
                ⚠ {i}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Insights;
