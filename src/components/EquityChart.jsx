import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EquityChart = ({ trades }) => {
  let cumulative = 0;

  const data = trades.map((t, i) => {
    cumulative += (t.exit - t.entry) * 65;
    return { index: i + 1, equity: cumulative };
  });

  return (
    <div className="card p-3 mb-3">
      <h6>Equity Curve</h6>
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
