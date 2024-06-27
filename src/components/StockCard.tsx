// components/StockCard.js
import React from 'react';

const StockCard = ({ stock }) => {
  const {
    symbol,
    open,
    high,
    low,
    close,
    volume,
  } = stock;

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{symbol}</h2>
      <p className="text-lg">Open: ${open}</p>
      <p className="text-lg">High: ${high}</p>
      <p className="text-lg">Low: ${low}</p>
      <p className="text-lg">Close: ${close}</p>
      <p className="text-sm">Volume: {volume}</p>
    </div>
  );
};

export default StockCard;
