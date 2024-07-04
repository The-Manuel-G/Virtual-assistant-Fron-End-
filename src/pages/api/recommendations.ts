import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sueldo, compromisos, deudas, deseos } = req.body;

  const prompt = `
    Tengo un sueldo mensual de ${sueldo} con compromisos familiares de ${compromisos} y deudas mensuales de ${deudas}. 
    Estos son mis deseos y sus costos: ${deseos.map((deseo: { nombre: string; costo: number }) => `${deseo.nombre}: ${deseo.costo}`).join(', ')}.
    Proporciona recomendaciones detalladas y específicas para ahorrar más dinero o conseguir ingresos adicionales.
  `;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });

    res.status(200).json({ recommendations: completion.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
