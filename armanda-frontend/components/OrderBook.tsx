import React, { useEffect, useState } from 'react';

interface Order {
  price: number;
  amount: number;
}

interface OrderBookData {
  bids: Order[];
  asks: Order[];
}

const OrderBook: React.FC = () => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({ bids: [], asks: [] });

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://your-websocket-endpoint');

    // Event handler for receiving messages
    ws.onmessage = (event: MessageEvent) => {
      try {
        // Parse the received data
        const data: OrderBookData = JSON.parse(event.data);
        setOrderBookData(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Order Book</h2>
      <div>
        <h3>Bids</h3>
        <ul>
          {orderBookData.bids.map((bid, index) => (
            <li key={index}>
              Price: {bid.price}, Amount: {bid.amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Asks</h3>
        <ul>
          {orderBookData.asks.map((ask, index) => (
            <li key={index}>
              Price: {ask.price}, Amount: {ask.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;
