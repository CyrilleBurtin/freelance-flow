'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return { tasks, error: null };
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    return {
      tasks: [],
      error: 'Impossible de charger les tâches. Veuillez réessayer plus tard.',
    };
  }
}
