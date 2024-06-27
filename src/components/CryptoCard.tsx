// components/CryptoCard.js
import React from 'react';

const CryptoCard = ({ crypto }) => {
  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap,
  } = crypto;

  return (
    <div className="flex items-center bg-gray-900 text-gray-300 p-4 rounded-lg shadow-md border border-gray-800 space-x-4">
      <img src={image} alt={name} className="w-10 h-10" />
      <div>
        <h2 className="text-lg font-bold">{name} ({symbol.toUpperCase()})</h2>
        <p className="text-md">${current_price}</p>
        <p
          className={`text-md ${
            price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {price_change_percentage_24h.toFixed(2)}%
        </p>
        <p className="text-xs">Market Cap: ${market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CryptoCard;
