import React from 'react';

// Define an interface for Buy/Sell Signal
interface BuySellSignal {
  symbol: string;
  price: number;
  signal: 'buy' | 'sell';
}

// Define the component props
interface BuySellSignalsProps {
  signals: BuySellSignal[];
}

// BuySellSignals Component
const BuySellSignals: React.FC<BuySellSignalsProps> = ({ signals }) => {
  return (
    <div>
      <h2>Buy/Sell Signals</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Signal</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((signal, index) => (
            <tr key={index}>
              <td>{signal.symbol}</td>
              <td>{signal.price.toFixed(2)}</td>
              <td>{signal.signal.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuySellSignals;
