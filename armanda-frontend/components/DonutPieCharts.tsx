import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

interface DonutPieChartsProps {
  data: {
    name: string;
    value: number;
  }[];
}

const DonutPieCharts: React.FC<DonutPieChartsProps> = ({ data }) => {
  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          innerRadius={80}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DonutPieCharts;
