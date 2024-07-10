// Code: src/app/api/saveScore/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { userId, score } = await req.json();
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        score: {
          increment: score,
        },
        gamesPlayed: {
          increment: 1,
        },
        lastPlayed: new Date(),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error saving score' });
  }
}
