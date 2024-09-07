import React, { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
}

interface StockSelectorProps {
  onStockChange: (symbol: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ onStockChange }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');

  useEffect(() => {
    // Fetch stock symbols from an API or static list
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => console.error('Error fetching stocks:', err));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const symbol = event.target.value;
    setSelectedStock(symbol);
    onStockChange(symbol); // Notify parent component of the selected stock
  };

  return (
    <div>
      <label htmlFor="stock-selector">Select Stock:</label>
      <select
        id="stock-selector"
        value={selectedStock}
        onChange={handleChange}
      >
        <option value="">--Select a stock--</option>
        {stocks.map(stock => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
