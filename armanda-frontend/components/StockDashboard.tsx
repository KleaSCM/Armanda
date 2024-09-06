import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register the required components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockDashboardProps {
  symbol: string;
}

const StockDashboard: React.FC<StockDashboardProps> = ({ symbol }) => {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(symbol);
    };

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData);
        setError(null);
      } catch (err) {
        setError('Error parsing data');
      }
    };

    ws.onerror = (event) => {
      setError(`WebSocket Error: ${event}`);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: `Price of ${symbol}`,
        data: data.map(item => item.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Line data={chartData} />
    </div>
  );
};

export default StockDashboard;
