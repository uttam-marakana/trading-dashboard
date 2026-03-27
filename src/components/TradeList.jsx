import dayjs from "dayjs";
import { calculateCharges, calculatePnL } from "../utils/calculations";
import { getTradeQualityScore } from "../utils/scoreEngine";

const TradeList = ({ trades }) => {
  return (
    <div className="card p-3">
      <h6 className="mb-3">Recent Trades</h6>

      {trades.map((t) => {
        const pnl = calculatePnL(t);
        const charges = calculateCharges(t);
        const net = pnl - charges;
        const quality = getTradeQualityScore(t);

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

            <div className="small">
              Quality:{" "}
              <strong
                className={
                  quality >= 8
                    ? "text-success"
                    : quality >= 5
                      ? "text-warning"
                      : "text-danger"
                }
              >
                {quality}/10
              </strong>
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
