import { getDisciplineScore } from "../utils/scoreEngine";

const DisciplineScore = ({ trades }) => {
  const score = getDisciplineScore(trades);

  const getStatus = () => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Needs Improvement";
    return "Poor Discipline";
  };

  const colorClass =
    score >= 8 ? "text-profit" : score >= 5 ? "text-warning" : "text-loss";

  return (
    <div className="card p-3 text-center">
      <h6>Discipline Score</h6>

      <div className={`font-lg ${colorClass}`}>{score}/10</div>

      <div className="small">{getStatus()}</div>
    </div>
  );
};

export default DisciplineScore;
