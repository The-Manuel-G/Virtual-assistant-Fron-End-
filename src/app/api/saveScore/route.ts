// src/app/api/saveScore/route.ts
import { supabase } from '../../../src/utils/supabase/client';  // Ajusta la ruta según la estructura de tu proyecto

export async function POST(req, res) {
  const { userId, score } = await req.json();

  try {
    // Incrementar la puntuación y los juegos jugados
    await supabase.rpc('increment_games_played', { user_id: userId, increment_value: score });

    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error saving score' });
  }
}
