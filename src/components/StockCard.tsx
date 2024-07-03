// components/StockCard.js
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), {
  ssr: false,
});

const StockCard = ({ stock }) => {
  const [showChart, setShowChart] = useState(false);
  const { symbol, open, high, low, close, volume } = stock;

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{symbol}</h2>
      <p className="text-lg">Open: ${open}</p>
      <p className="text-lg">High: ${high}</p>
      <p className="text-lg">Low: ${low}</p>
      <p className="text-lg">Close: ${close}</p>
      <p className="text-sm">Volume: {volume}</p>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
        onClick={() => setShowChart(!showChart)}
      >
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>
      {showChart && <TradingViewWidget symbol={symbol} />}
    </div>
  );
};

export default StockCard;
