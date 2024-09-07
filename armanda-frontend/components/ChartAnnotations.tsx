import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CandlestickDataPoint, Annotation } from '../types/types';

interface ChartAnnotationsProps {
  data: CandlestickDataPoint[];
  annotations: Annotation[];
  title: string;
}

const ChartAnnotations: React.FC<ChartAnnotationsProps> = ({ data, annotations, title }) => {
  // Convert annotations to the format expected by the chart
  const annotationData = annotations.map(annotation => ({
    x: annotation.x,
    y: annotation.y,
    type: annotation.type,
    label: annotation.label,
  }));

  return (
    <div>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="c" // Close price
            stroke="#8884d8"
          />
          {/* Render annotations */}
          {annotationData.map((annotation, index) => (
            <Line
              key={index}
              type="linear"
              dataKey={annotation.y.toString()}
              stroke={annotation.type === 'line' ? '#FF0000' : '#00FF00'}
              dot={{ stroke: annotation.type === 'line' ? '#FF0000' : '#00FF00' }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartAnnotations;
