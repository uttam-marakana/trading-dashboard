import { useState } from "react";

const LOT_SIZE = 65;
const MAX_RISK_PER_TRADE = 500;

const RiskEngine = () => {
  const [entry, setEntry] = useState("");
  const [sl, setSL] = useState("");

  const riskPerLot = entry && sl ? Math.abs(entry - sl) * LOT_SIZE : 0;

  const allowedLots =
    riskPerLot > 0 ? Math.floor(MAX_RISK_PER_TRADE / riskPerLot) : 0;

  return (
    <div className="card p-3">
      <h6>Risk Engine</h6>

      <div className="row g-2">
        <div className="col-6">
          <input
            placeholder="Entry"
            type="number"
            className="form-control"
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
          />
        </div>

        <div className="col-6">
          <input
            placeholder="Stop Loss"
            type="number"
            className="form-control"
            value={sl}
            onChange={(e) => setSL(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-3 small">
        <div>Risk per lot: ₹{riskPerLot.toFixed(2)}</div>
        <div>Allowed lots: {allowedLots}</div>

        <div className={allowedLots > 0 ? "text-success" : "text-danger"}>
          {allowedLots > 0 ? "✔ Safe position" : "⚠ Too risky"}
        </div>
      </div>
    </div>
  );
};

export default RiskEngine;
