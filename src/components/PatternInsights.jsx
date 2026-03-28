import { patternEngine } from "../core/patternEngine";

const PatternInsights = ({ trades }) => {
  const p = patternEngine(trades);

  if (!trades.length) return null;

  return (
    <div className="card p-3">
      <h6>Pattern Insights</h6>

      <div className="small">Loss Streak: {p.lossStreak}</div>
      <div className="small">Best Strategy: {p.bestStrategy}</div>
      <div className="small">Worst Hour: {p.worstHour}:00</div>
    </div>
  );
};

export default PatternInsights;
