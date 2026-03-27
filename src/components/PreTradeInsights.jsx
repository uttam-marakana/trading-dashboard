import { calculateCharges } from "../utils/calculations";

const LOT_SIZE = 65;

const PreTradeInsights = ({ values }) => {
  const entry = Number(values.entry || 0);
  const exit = Number(values.exit || 0);
  const sl = Number(values.sl || 0);
  const qty = Number(values.qty || 1);

  if (!entry || !exit || !sl) return null;

  const pnl = (exit - entry) * LOT_SIZE * qty;
  const charges = calculateCharges({ entry, exit });
  const net = pnl - charges;

  const risk = Math.abs(entry - sl) * LOT_SIZE * qty;
  const reward = Math.abs(exit - entry) * LOT_SIZE * qty;

  const rr = risk ? (reward / risk).toFixed(2) : 0;
  const breakeven = charges / (LOT_SIZE * qty);

  const warnings = [];

  if (risk > 300) warnings.push("High risk (> ₹300)");
  if (rr < 1.2) warnings.push("Low R:R ratio");
  if (breakeven > 5) warnings.push("High break-even move");
  if (net < 0) warnings.push("Trade not profitable after charges");

  return (
    <div className="card p-2 mt-2">
      <div className="small">
        <div>Risk: ₹{risk.toFixed(2)}</div>
        <div>R:R: {rr}</div>
        <div>Net: ₹{net.toFixed(2)}</div>
        <div>Break-even: {breakeven.toFixed(2)}</div>
      </div>

      {warnings.length > 0 && (
        <div className="mt-2 text-danger small">
          {warnings.map((w, i) => (
            <div key={i}>⚠ {w}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreTradeInsights;
