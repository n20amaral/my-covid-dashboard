import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Graph = ({ data, lines, xAxisKey }) => (
  lines.length &&
  <ResponsiveContainer>
    <LineChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      {lines.map((line) => (
          <Line key={line.dataKey} type="monotone" {...line} />
        ))}
    </LineChart>
  </ResponsiveContainer>
);

export default Graph;
