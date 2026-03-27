import { calculateSummary } from "../utils/calculations";

const INITIAL_CAPITAL = 17000;

const SummaryCard = ({ trades }) => {
  const s = calculateSummary(trades);
  const capital = INITIAL_CAPITAL + s.netPnL;

  return (
    <div className="card p-3 mb-3 text-center">
      <h6>Net PnL</h6>

      <div className={`pnl ${s.netPnL >= 0 ? "text-success" : "text-danger"}`}>
        ₹{s.netPnL.toFixed(2)}
      </div>

      <div className="row mt-3">
        <div className="col-4">
          <small>Capital</small>
          <div>₹{capital.toFixed(2)}</div>
        </div>

        <div className="col-4">
          <small>Charges</small>
          <div>₹{s.totalCharges.toFixed(2)}</div>
        </div>

        <div className="col-4">
          <small>Trades</small>
          <div>{s.totalTrades}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
