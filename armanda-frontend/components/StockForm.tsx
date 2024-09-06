import React, { useState } from 'react';

interface StockFormProps {
    onStockSubmit: (symbol: string) => void;
}

const StockForm: React.FC<StockFormProps> = ({ onStockSubmit }) => {
    const [symbol, setSymbol] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStockSubmit(symbol);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol"
            />
            <button type="submit">Get Dashboard</button>
        </form>
    );
};

export default StockForm;
