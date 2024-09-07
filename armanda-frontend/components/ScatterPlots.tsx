import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ScatterPlotsProps {
  data: {
    priceVolume: { x: number; y: number }[];
    riskReturn: { x: number; y: number }[];
  };
}

const ScatterPlots: React.FC<ScatterPlotsProps> = ({ data }) => {
  return (
    <div>
      <h3>Price vs Volume</h3>
      <ScatterChart width={600} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Price" unit="$" />
        <YAxis type="number" dataKey="y" name="Volume" unit="k" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Price vs Volume" data={data.priceVolume} fill="blue" />
      </ScatterChart>

      <h3>Risk vs Return</h3>
      <ScatterChart width={600} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Risk" />
        <YAxis type="number" dataKey="y" name="Return" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Risk vs Return" data={data.riskReturn} fill="green" />
      </ScatterChart>
    </div>
  );
};

export default ScatterPlots;
