import { generateReport } from "../utils/reportEngine";

const WeeklyReport = ({ trades }) => {
  const r = generateReport(trades);

  return (
    <div className="card p-3">
      <h6>Weekly Report</h6>

      <div className="small">Trades: {r.totalTrades}</div>
      <div className="small">Win Rate: {r.winRate}%</div>
      <div className="small">Loss Rate: {r.lossRate}%</div>
      <div className="small">Mistake Rate: {r.mistakeRate}%</div>
    </div>
  );
};

export default WeeklyReport;
