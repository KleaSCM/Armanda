import React, { useState, useEffect } from 'react';

interface StockData {
  [key: string]: {
    [key: string]: string;
  };
}

const Stock: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState<string>('');
  const [alertPrice, setAlertPrice] = useState<number | null>(null);
  const [alertTriggered, setAlertTriggered] = useState<boolean>(false);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/stock/${symbol}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setStockData(data.stockData);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch stock data');
    }
  };

  useEffect(() => {
    if (stockData && alertPrice) {
      const currentPrice = parseFloat(stockData[Object.keys(stockData)[0]]['4. close']);
      if (currentPrice >= alertPrice) {
        setAlertTriggered(true);
      }
    }
  }, [stockData, alertPrice]);

  return (
    <div>
      <h1>Stock Tracker</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchStockData}>Fetch Stock</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {stockData && (
        <div>
          <h2>{symbol.toUpperCase()} Stock Data</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}

      <div>
        <input
          type="number"
          placeholder="Set alert price"
          onChange={(e) => setAlertPrice(parseFloat(e.target.value))}
        />
        {alertTriggered && <p style={{ color: 'green' }}>Alert: Stock reached the target price!</p>}
      </div>
    </div>
  );
};

export default Stock;
