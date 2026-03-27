import { useState } from "react";
import { calculateCharges } from "../utils/calculations";

const LOT_SIZE = 65;

const TradeCalculator = () => {
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");

  const trade = {
    entry: Number(entry || 0),
    exit: Number(exit || 0),
  };

  const charges = calculateCharges(trade);

  const gross = (trade.exit - trade.entry) * LOT_SIZE;
  const net = gross - charges;

  const breakEvenMove = charges / LOT_SIZE;

  const isValid = breakEvenMove < 10; // your scalping threshold

  return (
    <div className="card p-3">
      <h6>Trade Calculator</h6>

      <div className="row g-2">
        <div className="col-6">
          <input
            placeholder="Entry"
            type="number"
            className="form-control"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </div>

        <div className="col-6">
          <input
            placeholder="Exit"
            type="number"
            className="form-control"
            value={exit}
            onChange={(e) => setExit(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 small">
        <div>Charges: ₹{charges}</div>
        <div>Gross PnL: ₹{gross.toFixed(2)}</div>
        <div className={net >= 0 ? "text-success" : "text-danger"}>
          Net PnL: ₹{net.toFixed(2)}
        </div>
        <div>Break-even move: {breakEvenMove.toFixed(2)} pts</div>

        <div className={isValid ? "text-success" : "text-danger mt-2"}>
          {isValid ? "✔ Valid Trade" : "⚠ Not worth (too costly)"}
        </div>
      </div>
    </div>
  );
};

export default TradeCalculator;
