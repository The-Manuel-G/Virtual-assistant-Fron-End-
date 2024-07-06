"use client";

import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

interface Deseo {
  nombre: string;
  costo: string;
}

interface Deuda {
  nombre: string;
  cantidad: string;
}

export default function Resultados() {
  const [resultados, setResultados] = useState<any[]>([]);
  const [ahorroMensual, setAhorroMensual] = useState<number>(0);
  const [recomendaciones, setRecomendaciones] = useState<string[]>([]);
  const [gastos, setGastos] = useState<number>(0);
  const [compromisos, setCompromisos] = useState<number>(0);
  const [deudas, setDeudas] = useState<Deuda[]>([]);

  useEffect(() => {
    const sueldo = parseFloat(localStorage.getItem('sueldo') || '0');
    const compromisosLocal = parseFloat(localStorage.getItem('compromisos') || '0');
    const deudasLocal = JSON.parse(localStorage.getItem('deudas') || '[]') as Deuda[];
    const deseos = JSON.parse(localStorage.getItem('deseos') || '[]') as Deseo[];

    const totalDeudas = deudasLocal.reduce((acc, deuda) => acc + parseFloat(deuda.cantidad.split('-')[1]), 0);
    const ahorroMensual = sueldo - (compromisosLocal + totalDeudas);
    setAhorroMensual(ahorroMensual);
    setDeudas(deudasLocal);
    setCompromisos(compromisosLocal);

    const nuevosResultados = deseos.map(deseo => {
      const costo = parseFloat(deseo.costo.split('-')[1]);
      const meses = costo / ahorroMensual;
      const años = meses / 12;
      return { nombre: deseo.nombre, meses, años };
    });

    setResultados(nuevosResultados);
    setGastos(compromisosLocal + totalDeudas);

    fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sueldo, compromisos: compromisosLocal, deudas: deudasLocal, deseos }),
    })
      .then(response => response.json())
      .then(data => {
        setRecomendaciones(data.recommendations);
      });
  }, []);

  const dataDeseos = {
    labels: resultados.map(r => r.nombre),
    datasets: [
      {
        label: 'Meses',
        data: resultados.map(r => r.meses),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Años',
        data: resultados.map(r => r.años),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataGastos = {
    labels: ['Compromisos', 'Deudas', 'Ahorro'],
    datasets: [
      {
        data: [
          compromisos,
          deudas.reduce((acc, deuda) => acc + parseFloat(deuda.cantidad.split('-')[1]), 0),
          ahorroMensual > 0 ? ahorroMensual : 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Meses / Años',
          color: '#FFFFFF',
        },
        ticks: {
          callback: function (value) {
            return value + ' meses';
          },
          color: '#FFFFFF',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Deseos',
          color: '#FFFFFF',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            color: '#FFFFFF',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(2)} ${label === 'Meses' ? 'meses' : 'años'}`;
          },
        },
      },
    },
  };

  const optionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#FFFFFF',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Resultados de Ahorro</h1>
      <div className="w-full flex flex-wrap justify-center items-center gap-4">
        <div className="flex-1 h-96 p-4 bg-gray-800 shadow-lg rounded-lg">
          <Bar data={dataDeseos} options={optionsBar} />
        </div>
        <div className="flex-1 h-96 p-4 bg-gray-800 shadow-lg rounded-lg">
          <Doughnut data={dataGastos} options={optionsDoughnut} />
        </div>
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        <div className="w-full md:w-2/3 p-6 bg-gray-900 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Detalles de Ahorro</h2>
          {resultados.map((resultado, index) => (
            <p key={index} className="text-lg">{`${resultado.nombre}: ${resultado.meses.toFixed(2)} meses (${resultado.años.toFixed(2)} años)`}</p>
          ))}
        </div>
        <div className="w-full md:w-2/3 p-6 bg-gray-900 shadow-lg rounded-lg mt-8">
          <h2 className="text-3xl font-bold mb-4">Recomendaciones</h2>
          {recomendaciones.map((recomendacion, index) => (
            <p key={index} className="text-lg">{recomendacion}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
