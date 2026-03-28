import { patternEngine } from "../core/patternEngine";
import { adaptiveRules } from "../utils/adaptiveRules";

const AdaptiveFeedback = ({ trades }) => {
  const patterns = patternEngine(trades);
  const rules = adaptiveRules(patternEngine(trades));

  if (!rules.length) return null;

  return (
    <div className="card p-2 text-warning small">
      {rules.map((r, i) => (
        <div key={i}>⚠ {r}</div>
      ))}
    </div>
  );
};

export default AdaptiveFeedback;
