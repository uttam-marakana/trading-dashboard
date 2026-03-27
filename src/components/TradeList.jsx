import dayjs from "dayjs";
import { calculateCharges } from "../utils/calculations";

const TradeList = ({ trades }) => {
  return (
    <div className="card p-3">
      <h6 className="mb-3">Recent Trades</h6>

      {trades.map((t) => (
        <div key={t.id} className="trade-item p-2 mb-2">
          <div className="d-flex justify-content-between">
            <strong>
              {t.type} {t.strike} ({t.premium})
            </strong>

            <span className={t.pnl >= 0 ? "text-success" : "text-danger"}>
              ₹{((t.exit - t.entry) * 65).toFixed(2)}
            </span>
          </div>

          <small>
            {t.entry} → {t.exit} | {t.strategy}
          </small>

          <div className="text-muted small">
            Charges: ₹{calculateCharges(t)}
          </div>

          <div className="text-muted small">
            {dayjs(t.date).format("HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TradeList;
