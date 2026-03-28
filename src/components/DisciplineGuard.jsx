import { checkDiscipline } from "../core/disciplineManager";

const DisciplineGuard = ({ trades, session }) => {
  const result = checkDiscipline(session);

  return (
    <div className="card p-3">
      <h6>Discipline Status</h6>

      {result.allowed ? (
        <div className="text-profit">✔ System Clean</div>
      ) : (
        <div className="text-loss">⚠ {result.reason}</div>
      )}
    </div>
  );
};

export default DisciplineGuard;
