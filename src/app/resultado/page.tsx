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
  const [deudas, setDeudas] = useState<Deuda[]>([]);

  useEffect(() => {
    const sueldo = parseFloat(localStorage.getItem('sueldo') || '0');
    const compromisos = parseFloat(localStorage.getItem('compromisos') || '0');
    const deudas = JSON.parse(localStorage.getItem('deudas') || '[]') as Deuda[];
    const deseos = JSON.parse(localStorage.getItem('deseos') || '[]') as Deseo[];
    
    const totalDeudas = deudas.reduce((acc, deuda) => acc + parseFloat(deuda.cantidad.split('-')[1]), 0);
    const ahorroMensual = sueldo - (compromisos + totalDeudas);
    setAhorroMensual(ahorroMensual);
    setDeudas(deudas);

    const nuevosResultados = deseos.map(deseo => {
      const costo = parseFloat(deseo.costo.split('-')[1]);
      const meses = costo / ahorroMensual;
      const años = meses / 12;
      return { nombre: deseo.nombre, meses, años };
    });

    setResultados(nuevosResultados);
    setGastos(compromisos + totalDeudas);

    fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sueldo, compromisos, deudas, deseos }),
    })
      .then(response => response.json())
      .then(data => {
        setRecomendaciones(data.recommendations.split('. '));
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
          gastos,
          deudas.reduce((acc, deuda) => acc + parseFloat(deuda.cantidad.split('-')[1]), 0),
          ahorroMensual > 0 ? ahorroMensual : 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const optionsBar = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Meses / Años'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Deseos'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  const optionsDoughnut = {
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Resultados de Ahorro</h1>
      <div className="w-full flex flex-wrap justify-center">
        <div className="w-full md:w-2/3 p-4">
          <Bar data={dataDeseos} options={optionsBar} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <Doughnut data={dataGastos} options={optionsDoughnut} />
        </div>
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        {resultados.map((resultado, index) => (
          <p key={index} className="text-lg">{`${resultado.nombre}: ${resultado.meses.toFixed(2)} meses (${resultado.años.toFixed(2)} años)`}</p>
        ))}
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Recomendaciones</h2>
        {recomendaciones.map((recomendacion, index) => (
          <p key={index} className="text-lg">{recomendacion}</p>
        ))}
      </div>
    </div>
  );
}

