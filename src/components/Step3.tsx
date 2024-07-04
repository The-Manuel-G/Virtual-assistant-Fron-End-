import React from 'react';

interface Deuda {
  nombre: string;
  cantidad: string;
}

interface Step3Props {
  deudas: Deuda[];
  setDeudas: (deudas: Deuda[]) => void;
  handleNext: () => void;
}

export default function Step3({ deudas, setDeudas, handleNext }: Step3Props) {
  const handleChange = (index: number, field: string, value: string) => {
    const newDeudas = [...deudas];
    newDeudas[index] = { ...newDeudas[index], [field]: value };
    setDeudas(newDeudas);
  };

  const handleAddDeuda = () => {
    setDeudas([...deudas, { nombre: '', cantidad: '' }]);
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <h3 className="text-lg mb-4">Deudas Mensuales:</h3>
      {deudas.map((deuda, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            className="mb-2 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
            placeholder="Nombre de la deuda"
            value={deuda.nombre}
            onChange={(e) => handleChange(index, 'nombre', e.target.value)}
          />
          <select
            className="mb-2 p-2 border border-gray-300 rounded text-black transition duration-300 focus:ring-2 focus:ring-blue-400"
            value={deuda.cantidad}
            onChange={(e) => handleChange(index, 'cantidad', e.target.value)}
          >
            <option value="">Selecciona un rango de cantidad</option>
            {['0-50', '51-100', '101-200', '201-500', '501-1000', '1001-2000', '2001-5000', '5001-10000', '10001-20000'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button
        onClick={handleAddDeuda}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-700 mb-4"
      >
        Añadir Deuda
      </button>
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
