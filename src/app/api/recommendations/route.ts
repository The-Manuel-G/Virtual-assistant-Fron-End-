import { NextRequest, NextResponse } from 'next/server';

interface Deseo {
  nombre: string;
  costo: string;
}

interface Deuda {
  nombre: string;
  cantidad: string;
}

const generateRecommendations = (sueldo: number, compromisos: number, deudas: Deuda[], deseos: Deseo[]): string[] => {
  let recommendations: string[] = [];

  // Sumar total de deudas
  const totalDeudas = deudas.reduce((acc, deuda) => acc + parseFloat(deuda.cantidad.split('-')[1]), 0);
  const ahorroMensual = sueldo - (compromisos + totalDeudas);

  // Generar recomendaciones basadas en el análisis
  if (ahorroMensual <= 0) {
    recommendations.push("Tus gastos superan tus ingresos. Considera reducir gastos o encontrar formas adicionales de ingresos.");
  } else {
    recommendations.push("Tus ingresos son suficientes para cubrir tus gastos actuales.");
    recommendations.push(`Puedes ahorrar aproximadamente $${ahorroMensual.toFixed(2)} al mes.`);
  }

  // Analizar deseos
  deseos.forEach(deseo => {
    const costo = parseFloat(deseo.costo.split('-')[1]);
    const meses = costo / ahorroMensual;
    if (meses <= 0) {
      recommendations.push(`No puedes ahorrar lo suficiente para ${deseo.nombre} con tus ingresos actuales.`);
    } else {
      recommendations.push(`Para ahorrar para ${deseo.nombre}, necesitarás aproximadamente ${meses.toFixed(2)} meses.`);
    }
  });

  // Sugerencias generales
  recommendations.push("Considera hacer un seguimiento detallado de tus gastos para identificar áreas donde puedas reducir costos.");
  recommendations.push("Revisa tus suscripciones y gastos recurrentes para asegurarte de que sigan siendo necesarios.");

  return recommendations;
};

export async function POST(req: NextRequest) {
  try {
    const { sueldo, compromisos, deudas, deseos } = await req.json();
    const recommendations = generateRecommendations(sueldo, compromisos, deudas, deseos);
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
