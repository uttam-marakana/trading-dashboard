import { patternEngine } from "../core/patternEngine";

const PatternInsights = ({ trades }) => {
  if (!trades.length) return null;

  const p = patternEngine(trades);

  return (
    <div className="card p-3">
      <h6>Pattern Insights</h6>

      <div className="small">Loss Streak: {p.lossStreak}</div>

      {p.bestStrategy && (
        <div className="small">Best Strategy: {p.bestStrategy}</div>
      )}

      {p.worstHour !== null && (
        <div className="small">Worst Hour: {p.worstHour}:00</div>
      )}
    </div>
  );
};

export default PatternInsights;
