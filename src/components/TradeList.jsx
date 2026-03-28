import dayjs from "dayjs";
import {
  calculateNetPnL,
  calculatePnL,
  calculateCharges,
} from "../utils/calculations";
import { getTradeQualityScore } from "../utils/scoreEngine";

const TradeList = ({ trades }) => {
  return (
    <div className="card p-3">
      <h6>Recent Trades</h6>

      {trades.map((t) => {
        const pnl = calculatePnL(t);
        const charges = calculateCharges(t);
        const net = calculateNetPnL(t);
        const quality = getTradeQualityScore(t);

        return (
          <div key={t.id} className="trade-item p-2">
            <div className="flex justify-between">
              <strong>
                {t.type} {t.strike} ({t.premium})
              </strong>

              <span className={net >= 0 ? "text-profit" : "text-loss"}>
                ₹{net.toFixed(2)}
              </span>
            </div>

            <div className="small">
              {t.entry} → {t.exit} | {t.strategy}
            </div>

            <div className="text-muted small">
              Gross: ₹{pnl.toFixed(2)} | Charges: ₹{charges.toFixed(2)}
            </div>

            <div className="small">
              Quality:{" "}
              <strong
                className={
                  quality >= 8
                    ? "text-profit"
                    : quality >= 5
                      ? "text-warning"
                      : "text-loss"
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
