// Define the structure for historical stock data points (candlestick data)
export interface HistoricalData {
  x: string;  // Date or time (e.g., '2023-09-01')
  o: number;  // Open price
  h: number;  // High price
  l: number;  // Low price
  c: number;  // Close price
  v?: number; // Volume (optional, depending on data availability)
}

// CandlestickDataPoint extends HistoricalData
export interface CandlestickDataPoint extends HistoricalData {}

// Represents sector breakdown data
export interface SectorBreakdown {
  sector: string;
  value: number;  // Percentage or some value representing the sector
}

// Represents dividend income data for a stock
export interface DividendIncome {
  symbol: string;  // Stock symbol (e.g., 'AAPL')
  dividend: number;  // Amount of dividend income
}

// Defines an annotation for a chart
export interface Annotation {
  x: string;  // The x-axis position (e.g., date or time)
  y: number;  // The y-axis position (e.g., price)
  type: string;  // The type of annotation (e.g., 'arrow', 'circle')
  label: string;  // Text label for the annotation
}

// Represents buy/sell signal data
export interface BuySellSignal {
  symbol: string;  // Stock symbol (e.g., 'AAPL')
  price: number;   // The price at which the signal is generated
  signal: 'buy' | 'sell';  // Either 'buy' or 'sell'
}

// Defines economic indicators data
export interface EconomicIndicatorsData {
  interestRates: { x: number; y: number }[];  // Interest rate data (e.g., [{ x: 2023, y: 2.5 }])
  inflation: { x: number; y: number }[];      // Inflation data (e.g., [{ x: 2023, y: 1.8 }])
  unemployment: { x: number; y: number }[];   // Unemployment data (e.g., [{ x: 2023, y: 5.0 }])
}

// Represents data for a pie chart
export interface PieData {
  name: string;  // Name of the pie segment (e.g., sector name)
  value: number; // Value associated with the segment (e.g., percentage or count)
}

// Represents scatter plot data
export interface ScatterData {
  priceVolume: { x: number; y: number }[];  // Scatter plot for price vs volume
  riskReturn: { x: number; y: number }[];   // Scatter plot for risk vs return
}

// Represents stock data, including historical candlestick data
export interface StockData {
  symbol: string;         // Stock symbol (e.g., 'AAPL')
  price: number;          // Current stock price
  volume: number;         // Current trading volume
  historical: HistoricalData[];  // Array of historical data points (candlesticks)
}
