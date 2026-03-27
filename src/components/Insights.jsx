import { getAIInsights } from "../utils/analytics";

const Insights = ({ trades }) => {
  const insights = getAIInsights(trades);

  return (
    <div className="card p-3 mb-3">
      <h6>Insights</h6>

      {/* EMPTY STATE */}
      {trades.length === 0 && (
        <div className="text-muted small">
          No trades yet. Start logging to see insights.
        </div>
      )}

      {/* INSIGHTS */}
      {trades.length > 0 && (
        <>
          {insights.length === 0 ? (
            <div className="text-success small">✔ System looks stable</div>
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
