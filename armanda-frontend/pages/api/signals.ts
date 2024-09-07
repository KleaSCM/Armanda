import type { NextApiRequest, NextApiResponse } from 'next';

// Define an interface for a signal
interface Signal {
  id: string;
  type: string; // e.g., 'buy' or 'sell'
  symbol: string;
  price: number;
  timestamp: string; // ISO 8601 date-time string
}

// Type the signals array explicitly
const signals: Signal[] = [
  // Example data
  { id: '1', type: 'buy', symbol: 'AAPL', price: 150.25, timestamp: '2024-09-07T12:34:56Z' },
  { id: '2', type: 'sell', symbol: 'GOOG', price: 2800.50, timestamp: '2024-09-07T13:45:00Z' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(signals);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
