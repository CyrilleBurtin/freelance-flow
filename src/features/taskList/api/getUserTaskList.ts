'use server';

import { PrismaClient } from '@/generated/prisma/client';
import { getUser } from '@/lib/getUser/getUser';

const prisma = new PrismaClient();

export async function getTasks() {
  const user = await getUser();

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: [{ deadline: 'desc' }],
    });
    return { tasks, error: null };
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    return {
      tasks: [],
      error: 'Impossible de charger les tâches. Veuillez réessayer plus tard.',
    };
  }
}
