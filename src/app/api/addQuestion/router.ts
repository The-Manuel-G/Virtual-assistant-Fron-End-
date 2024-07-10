//app/api/addQuestion/router.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { question, options, answer } = await req.json();
  try {
    const newQuestion = await prisma.question.create({
      data: {
        question,
        options,
        answer,
      },
    });
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error adding question' });
  }
}
