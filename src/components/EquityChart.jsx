import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculatePnL, calculateCharges } from "../utils/calculations";

const EquityChart = ({ trades }) => {
  let cumulative = 0;

  const data = trades.map((t, i) => {
    const pnl = calculatePnL(t);
    const charges = calculateCharges(t);
    cumulative += pnl - charges;

    return { index: i + 1, equity: cumulative };
  });

  return (
    <div className="card p-3 mb-3">
      <h6>Equity Curve (Net)</h6>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="equity" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityChart;
