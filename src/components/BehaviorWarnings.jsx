const BehaviorWarnings = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="card p-2 mt-2 text-warning small">
      {warnings.map((w, i) => (
        <div key={i}>⚠ {w}</div>
      ))}
    </div>
  );
};

export default BehaviorWarnings;
