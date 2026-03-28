const BehaviorWarnings = ({ warnings = [] }) => {
  if (!warnings.length) return null;

  return (
    <div className="card p-2 text-warning small">
      <strong>Warnings</strong>
      {warnings.map((w, i) => (
        <div key={i}>⚠ {w}</div>
      ))}
    </div>
  );
};

export default BehaviorWarnings;
