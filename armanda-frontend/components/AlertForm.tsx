import React, { useState } from 'react';
import { Alert } from '../types'; 

interface AlertFormProps {
    onAlertCreate: (alert: Alert) => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ onAlertCreate }) => {
    const [symbol, setSymbol] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [userID, setUserID] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const alert: Alert = { symbol, price: parseFloat(price), userID };
        onAlertCreate(alert);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Stock Symbol"
            />
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
            />
            <input
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                placeholder="User ID"
            />
            <button type="submit">Create Alert</button>
        </form>
    );
};

export default AlertForm;
