import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateNetPnL } from "../utils/calculations";

const EquityChart = ({ trades }) => {
  const data = trades.reduce(
    (acc, t, i) => {
      const prevEquity = i === 0 ? 0 : acc[i - 1].equity;
      const equity = prevEquity + calculateNetPnL(t);

      acc.push({
        index: i + 1,
        equity,
      });

      return acc;
    },
    [],
  );

  return (
    <div className="card p-3">
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
