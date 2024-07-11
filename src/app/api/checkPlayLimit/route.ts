// app/api/checkPlayLimit/router.ts
import { supabase } from '../../../src/utils/supabase/client';  // Ajusta la ruta según la estructura de tu proyecto

export async function GET(req, res) {
  const { userId } = req.query;

  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const today = new Date();
    const lastPlayed = new Date(user.lastPlayed);
    const canPlay = user.gamesPlayed < 2 ||
      (today.getDate() !== lastPlayed.getDate() ||
       today.getMonth() !== lastPlayed.getMonth() ||
       today.getFullYear() !== lastPlayed.getFullYear());

    res.status(200).json({ canPlay });
  } catch (error) {
    res.status(500).json({ error: 'Error checking play limit' });
  }
}
