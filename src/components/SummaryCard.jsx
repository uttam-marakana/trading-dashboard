import { calculateSummary } from "../utils/calculations";
import { LIMITS } from "../utils/constants";

const SummaryCard = ({ trades }) => {
  const s = calculateSummary(trades);
  const capital = LIMITS.INITIAL_CAPITAL + s.netPnL;

  return (
    <div className="card p-3 text-center">
      <h6>Net PnL</h6>

      <div className={s.netPnL >= 0 ? "text-profit" : "text-loss"}>
        ₹{s.netPnL.toFixed(2)}
      </div>

      <div className="grid-sub">
        <div>
          <small>Capital</small>
          <div>₹{capital.toFixed(2)}</div>
        </div>

        <div>
          <small>Charges</small>
          <div>₹{s.totalCharges.toFixed(2)}</div>
        </div>

        <div>
          <small>Trades</small>
          <div>{s.totalTrades}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
