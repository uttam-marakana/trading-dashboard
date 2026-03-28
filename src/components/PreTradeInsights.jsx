import {
  calculateCharges,
  calculatePnL,
  calculateNetPnL,
  calculateRR,
} from "../utils/calculations";
import { LIMITS } from "../utils/constants";

const PreTradeInsights = ({ values }) => {
  const entry = Number(values.entry || 0);
  const exit = Number(values.exit || 0);
  const sl = Number(values.sl || 0);
  const qty = Number(values.qty || 1);

  if (!entry || !exit || !sl) return null;

  const trade = { entry, exit, sl, qty };

  const pnl = calculatePnL(trade);
  const charges = calculateCharges(trade);
  const net = calculateNetPnL(trade);

  const risk = Math.abs(entry - sl) * LIMITS.LOT_SIZE * qty;
  const rr = calculateRR(trade);

  const breakeven = charges / (LIMITS.LOT_SIZE * qty);

  const warnings = [];

  if (risk > LIMITS.MAX_RISK) {
    warnings.push(`High risk (> ₹${LIMITS.MAX_RISK})`);
  }

  if (rr < 1.2) {
    warnings.push("Low R:R ratio");
  }

  if (breakeven > 5) {
    warnings.push("High break-even move");
  }

  if (net < 0) {
    warnings.push("Not profitable after charges");
  }

  return (
    <div className="card p-2">
      <div className="small">
        <div>Risk: ₹{risk.toFixed(2)}</div>
        <div>R:R: {rr}</div>
        <div>Net: ₹{net.toFixed(2)}</div>
        <div>Break-even: {breakeven.toFixed(2)}</div>
      </div>

      {warnings.length > 0 && (
        <div className="text-warning small">
          {warnings.map((w, i) => (
            <div key={i}>⚠ {w}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreTradeInsights;
