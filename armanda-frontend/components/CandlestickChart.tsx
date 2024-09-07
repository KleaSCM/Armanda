import React from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';

interface CandlestickDataPoint {
  x: string;  // Date or time
  o: number;  // Open price
  h: number;  // High price
  l: number;  // Low price
  c: number;  // Close price
}

interface CandlestickChartProps {
  data: CandlestickDataPoint[];
  title: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="h"
            fill="#FF0000"
            barSize={20}
          />
          <Bar
            dataKey="l"
            fill="#00FF00"
            barSize={20}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandlestickChart;
