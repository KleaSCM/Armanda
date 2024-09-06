import { useState } from 'react';
import StockDashboard from '../components/StockDashboard';

const IndexPage = () => {
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <div>
      <h1>Welcome to the Stock Tracker</h1>
      <input 
        type="text" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value.toUpperCase())} 
        placeholder="Enter stock symbol"
      />
      <StockDashboard symbol={symbol} />
    </div>
  );
};

export default IndexPage;
