import { calculateSummary } from "../utils/calculations";

const DisciplineGuard = ({ trades }) => {
  const summary = calculateSummary(trades);

  const violations = [];

  if (trades.length >= 3) {
    violations.push("Max Trades Reached");
  }

  if (summary.isLossLimitHit) {
    violations.push("Daily Loss Limit Hit");
  }

  const types = [...new Set(trades.map((t) => t.type))];
  if (types.length > 1) {
    violations.push("Direction Switching");
  }

  return (
    <div className="card p-3 mb-3">
      <h6>Discipline Status</h6>

      {violations.length === 0 ? (
        <div className="text-success">✔ System Clean</div>
      ) : (
        violations.map((v, i) => (
          <div key={i} className="text-danger">
            ⚠ {v}
          </div>
        ))
      )}
    </div>
  );
};

export default DisciplineGuard;
