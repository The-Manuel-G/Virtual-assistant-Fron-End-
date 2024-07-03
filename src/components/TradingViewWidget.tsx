// components/TradingViewWidget.js
import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.TradingView) {
      new window.TradingView.widget({
        container_id: containerRef.current,
        autosize: true,
        symbol: symbol,
        interval: '1',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
      });
    }
  }, [symbol]);

  return <div ref={containerRef} style={{ height: '400px', width: '100%' }} />;
};

export default TradingViewWidget;
