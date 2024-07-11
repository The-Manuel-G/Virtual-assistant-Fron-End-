// app/api/addQuestion/router.ts
import { supabase } from '../../../src/utils/supabase/client';  // Ajusta la ruta según la estructura de tu proyecto

export async function POST(req, res) {
  const { question, options, answer } = await req.json();

  try {
    const { data, error } = await supabase
      .from('Question')
      .insert([
        {
          question,
          options: JSON.stringify(options), // Asegúrate de que la columna acepta texto o JSON
          answer,
        },
      ]);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error adding question' });
  }
}
