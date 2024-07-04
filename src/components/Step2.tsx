import React from 'react';

interface Step2Props {
  compromisos: string;
  setCompromisos: (compromisos: string) => void;
  handleNext: () => void;
}

const compromisoOptions = [
  '0-50',
  '51-100',
  '101-200',
  '201-500',
  '501-1000',
];

export default function Step2({ compromisos, setCompromisos, handleNext }: Step2Props) {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <label className="mb-2 text-lg">Compromisos Familiares:</label>
      <select
        className="mb-4 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
        value={compromisos}
        onChange={(e) => setCompromisos(e.target.value)}
      >
        <option value="">Selecciona un rango de compromisos</option>
        {compromisoOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
