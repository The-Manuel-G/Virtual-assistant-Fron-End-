import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { userId } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const today = new Date();
    const lastPlayed = new Date(user.lastPlayed);
    const canPlay =
      user.gamesPlayed < 2 || (today.getDate() !== lastPlayed.getDate() || today.getMonth() !== lastPlayed.getMonth() || today.getFullYear() !== lastPlayed.getFullYear());
    res.status(200).json({ canPlay });
  } catch (error) {
    res.status(500).json({ error: 'Error checking play limit' });
  }
}
