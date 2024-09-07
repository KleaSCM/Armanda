import type { NextApiRequest, NextApiResponse } from 'next';

// Define an interface for an annotation
interface Annotation {
  id: string;
  text: string;
  x: number;
  y: number;
}

// Type the annotations array explicitly
const annotations: Annotation[] = [
  // Example data
  { id: '1', text: 'Sample Annotation 1', x: 10, y: 20 },
  { id: '2', text: 'Sample Annotation 2', x: 30, y: 40 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(annotations);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
