import React from 'react';
import HeatmapGrid from 'react-heatmap-grid';

const Heatmap: React.FC = () => {
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const yLabels = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4'];
  const data = [
    [25, 45, 60, 20, 75, 10, 45, 70],
    [30, 40, 50, 35, 65, 45, 55, 25],
    [55, 20, 35, 55, 45, 60, 30, 65],
    [75, 60, 20, 50, 30, 75, 35, 40],
  ];

  return (
    <div>
      <h2>Sector Performance Heatmap</h2>
      <HeatmapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        squares
        cellStyle={(x, y, ratio) => ({
          background: `rgb(12, 160, 90, ${ratio})`,
          color: '#fff',
        })}
        cellRender={(x, y, value) => `${value}`}
      />
    </div>
  );
};

export default Heatmap;
