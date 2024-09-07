declare module 'react-heatmap-grid' {
  interface HeatmapProps {
    xLabels: string[];
    yLabels: string[];
    data: number[][];
    background?: string[][];
    xLabelsLocation?: 'top' | 'bottom';
    xLabelsVisibility?: boolean[];
    yLabelWidth?: number;
    unit?: string;
    displayYLabels?: boolean;
    height?: number;
    squares?: boolean;
    cellStyle?: (x: number, y: number, ratio: number) => React.CSSProperties;
    onClick?: (x: number, y: number) => void;
    cellRender?: (x: number, y: number, value: number) => string; 
  }

  const HeatmapGrid: React.FC<HeatmapProps>;
  export default HeatmapGrid;
}
