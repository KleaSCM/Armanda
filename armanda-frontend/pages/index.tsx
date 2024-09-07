import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  CandlestickDataPoint, 
  SectorBreakdown, 
  DividendIncome, 
  Annotation, 
  BuySellSignal, 
  EconomicIndicatorsData, 
  PieData, 
  ScatterData, 
  StockData 
} from '../types/types';
import { fetchStockData } from '../services/stockService';

// Dynamically import components
const CandlestickChart = dynamic(() => import('../components/CandlestickChart'), { ssr: false });
const DonutPieCharts = dynamic(() => import('../components/DonutPieCharts'), { ssr: false });
const ChartAnnotations = dynamic(() => import('../components/ChartAnnotations'), { ssr: false });
const BuySellSignals = dynamic(() => import('../components/BuySellSignals'), { ssr: false });
const EconomicIndicators = dynamic(() => import('../components/EconomicIndicators'), { ssr: false });
const ScatterPlots = dynamic(() => import('../components/ScatterPlots'), { ssr: false });

const Home: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [scatterData, setScatterData] = useState<ScatterData>({ priceVolume: [], riskReturn: [] });

  useEffect(() => {
    // Fetch stock data whenever the selected symbol changes
    const loadStockData = async () => {
      try {
        const data = await fetchStockData(selectedSymbol); // Use the imported function
        setStockData(data);

        // Transform the stock data for scatter plots
        const transformedScatterData = transformStockDataForScatter(data);
        setScatterData(transformedScatterData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    loadStockData();
  }, [selectedSymbol]);

  // Mock data for the other components
  const candlestickData: CandlestickDataPoint[] = stockData ? stockData.historical : [];
  const sectorBreakdownData: SectorBreakdown[] = [];
  const dividendIncomeData: DividendIncome[] = [];
  const annotationsData: Annotation[] = [];
  const signalsData: BuySellSignal[] = [];
  const economicData: EconomicIndicatorsData = {
    interestRates: [],
    inflation: [],
    unemployment: []
  };
  const pieData: PieData[] = [];

  return (
    <div>
      <h1>Stock Market Tracker</h1>

      <label htmlFor="stock-select">Choose a stock:</label>
      <select
        id="stock-select"
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
      >
        <option value="AAPL">Apple</option>
        <option value="MSFT">Microsoft</option>
        <option value="GOOGL">Google</option>
        {/* Add more options as needed */}
      </select>

      {stockData && (
        <div>
          <CandlestickChart data={candlestickData} title="Candlestick Chart" />
          <DonutPieCharts data={pieData} />
          <ChartAnnotations data={candlestickData} annotations={annotationsData} title="Chart with Annotations" />
          <BuySellSignals signals={signalsData} />
          <EconomicIndicators data={economicData} />
          <ScatterPlots data={scatterData} />
          {/* Optional: Render sector and dividend data */}
          <div>
            <h3>Sector Breakdown</h3>
            <ul>
              {sectorBreakdownData.map((item, index) => (
                <li key={index}>{item.sector}: {item.value}</li>
              ))}
            </ul>
            <h3>Dividend Income</h3>
            <ul>
              {dividendIncomeData.map((item, index) => (
                <li key={index}>{item.symbol}: ${item.dividend.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to transform stock data for scatter plots
const transformStockDataForScatter = (data: StockData): ScatterData => {
  const historicalData = data.historical || [];

  const priceVolume = historicalData.map((point) => ({
    x: point.c, // Closing price
    y: point.v ? point.v / 1000 : 0, // Volume in thousands
  }));

  const riskReturn = historicalData.map((point) => ({
    x: calculateRisk(point), // Placeholder function for risk calculation
    y: calculateReturn(point), // Placeholder function for return calculation
  }));

  return { priceVolume, riskReturn };
};

// Example placeholder functions for risk and return calculations
const calculateRisk = (point: CandlestickDataPoint): number => {
  return point.h - point.l; // Risk as the range between high and low prices
};

const calculateReturn = (point: CandlestickDataPoint): number => {
  return point.c - point.o; // Return as the price change
};

export default Home;
