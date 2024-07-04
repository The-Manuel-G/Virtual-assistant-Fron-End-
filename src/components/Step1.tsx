import React from 'react';

interface Step1Props {
  sueldo: string;
  setSueldo: (sueldo: string) => void;
  handleNext: () => void;
}

const sueldoOptions = [
  '0-500',
  '501-1000',
  '1001-2000',
  '2001-3000',
  '3001-4000',
  '4001-5000',
  '5001-6000',
];

export default function Step1({ sueldo, setSueldo, handleNext }: Step1Props) {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <label className="mb-2 text-lg">Sueldo Mensual:</label>
      <select
        className="mb-4 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
        value={sueldo}
        onChange={(e) => setSueldo(e.target.value)}
      >
        <option value="">Selecciona un rango de sueldo</option>
        {sueldoOptions.map((option) => (
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

