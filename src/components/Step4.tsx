import React from 'react';
import { Pagination } from '@nextui-org/react';

interface Deseo {
  nombre: string;
  costo: string;
}

interface Step4Props {
  nuevoDeseo: Deseo;
  setNuevoDeseo: (deseo: Deseo) => void;
  deseos: Deseo[];
  handleNext: () => void;
  handleFinish: () => void;
}

const costOptions = [
  '0-5',
  '6-10',
  '11-20',
  '21-50',
  '51-100',
  '101-200',
  '201-500',
  '501-1000',
  '1001-2000',
  '2001-5000',
  '5001-10000',
  '10001-20000',
];

export default function Step4({
  nuevoDeseo,
  setNuevoDeseo,
  deseos,
  handleNext,
  handleFinish,
}: Step4Props) {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <label className="mb-2 text-lg">Nuevo Deseo:</label>
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
        placeholder="Nombre del deseo"
        value={nuevoDeseo.nombre}
        onChange={(e) => setNuevoDeseo({ ...nuevoDeseo, nombre: e.target.value })}
      />
      <label className="mb-2 text-lg">Costo del deseo:</label>
      <select
        className="mb-4 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
        value={nuevoDeseo.costo}
        onChange={(e) => setNuevoDeseo({ ...nuevoDeseo, costo: e.target.value })}
      >
        <option value="">Selecciona un rango de costo</option>
        {costOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-700 mb-4"
      >
        Agregar Deseo
      </button>
      <button
        onClick={handleFinish}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-green-700"
      >
        Finalizar
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Deseos Agregados:</h3>
        {deseos.map((deseo, index) => (
          <p key={index} className="text-lg">{`${deseo.nombre}: $${deseo.costo}`}</p>
        ))}
      </div>
      <div className="mt-8">
        <Pagination total={10} initialPage={1} variant="bordered" />
      </div>
    </div>
  );
}
