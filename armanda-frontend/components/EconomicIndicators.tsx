
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EconomicIndicatorsData } from '../types/types';

interface EconomicIndicatorsProps {
  data: EconomicIndicatorsData;
}

const EconomicIndicators: React.FC<EconomicIndicatorsProps> = ({ data }) => {
  // Convert data to Recharts-compatible format
  const formatData = (dataArray: { x: number; y: number }[]) =>
    dataArray.map(point => ({ time: point.x, rate: point.y }));

  return (
    <div>
      <h2>Economic Indicators</h2>
      <div>
        <h3>Interest Rates</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatData(data.interestRates)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#FF0000"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Inflation</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatData(data.inflation)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#00FF00"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Unemployment</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatData(data.unemployment)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#0000FF"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EconomicIndicators;