import dayjs from "dayjs";
import { calculateCharges, calculatePnL } from "../utils/calculations";

const TradeList = ({ trades }) => {
  return (
    <div className="card p-3">
      <h6 className="mb-3">Recent Trades</h6>

      {trades.map((t) => {
        const pnl = calculatePnL(t);
        const charges = calculateCharges(t);
        const net = pnl - charges;

        return (
          <div key={t.id} className="trade-item p-2 mb-2">
            <div className="d-flex justify-content-between">
              <strong>
                {t.type} {t.strike} ({t.premium})
              </strong>

              <span className={net >= 0 ? "text-success" : "text-danger"}>
                ₹{net.toFixed(2)}
              </span>
            </div>

            <small>
              {t.entry} → {t.exit} | {t.strategy}
            </small>

            <div className="text-muted small">
              Gross: ₹{pnl.toFixed(2)} | Charges: ₹{charges.toFixed(2)}
            </div>

            <div className="text-muted small">
              {dayjs(t.date).format("HH:mm")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TradeList;
