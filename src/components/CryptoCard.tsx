// components/CryptoCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Necesario para configurar react-modal en Next.js
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

const CryptoCard = ({ crypto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h,
    price_change_percentage_7d_in_currency,
    total_volume,
    market_cap,
  } = crypto;

  const data = {
    labels: ['1h', '24h', '7d'],
    datasets: [
      {
        label: `${name} Price Change`,
        data: [
          price_change_percentage_1h_in_currency,
          price_change_percentage_24h,
          price_change_percentage_7d_in_currency
        ],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      }
    ]
  };

  return (
    <>
      <motion.div
        className="flex items-center bg-gray-900 text-gray-300 p-4 rounded-lg shadow-md border border-gray-800 space-x-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={image} alt={name} className="w-10 h-10" />
        <div>
          <h2 className="text-lg font-bold">{name} ({symbol.toUpperCase()})</h2>
          <p className="text-md">Precio: ${current_price}</p>
          <p
            className={`text-md ${
              price_change_percentage_1h_in_currency > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            Cambio 1h: {price_change_percentage_1h_in_currency?.toFixed(2)}%
          </p>
          <p
            className={`text-md ${
              price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            Cambio 24h: {price_change_percentage_24h.toFixed(2)}%
          </p>
          <p
            className={`text-md ${
              price_change_percentage_7d_in_currency > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            Cambio 7d: {price_change_percentage_7d_in_currency?.toFixed(2)}%
          </p>
          <p className="text-xs">Volumen 24h: ${total_volume.toLocaleString()}</p>
          <p className="text-xs">Cap. de mercado: ${market_cap.toLocaleString()}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            onClick={() => setModalIsOpen(true)}
          >
            Ver Gráfica
          </button>
        </div>
      </motion.div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crypto Chart"
        className="bg-gray-800 p-6 rounded-lg shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold text-center mb-4">{name} ({symbol.toUpperCase()}) Price Change</h2>
        <Line data={data} />
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
          onClick={() => setModalIsOpen(false)}
        >
          Cerrar
        </button>
      </Modal>
    </>
  );
};

export default CryptoCard;
