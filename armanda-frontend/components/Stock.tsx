

import React from 'react';
import { StockData } from '../types'; 

interface StockProps {
    stock: StockData;
}

const Stock: React.FC<StockProps> = ({ stock }) => {
    return (
        <div>
            <h3>{stock.symbol}</h3>
            <p>Price: {stock.price}</p>
        </div>
    );
};

export default Stock;
