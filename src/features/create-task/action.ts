'use server';

import { PrismaClient } from '@/generated/prisma/client';
import { getUser } from '@/lib/getUser/getUser';
import { FormState } from '@/types/types';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const createTask = async (formData: FormData): Promise<FormState> => {
  const user = await getUser();

  if (!user) {
    return {
      message: 'User not authenticated',
      error: 'Utilisateur non authentifié',
    };
  }

  const title = formData.get('title') as string;
  const deadline = formData.get('deadline') as string;
  const clientId = formData.get('clientId') as string | null;
  const taskColor = formData.get('taskColor') as string | null;

  try {
    await prisma.task.create({
      data: {
        title,
        deadline,
        clientId: clientId,
        userId: user?.id,
        status: 'pending',
        order: 0,
        taskColor,
      },
    });

    revalidatePath('/');

    return { success: true, message: 'Task created' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Erreur lors de la création de la tâche',
    };
  } finally {
    await prisma.$disconnect();
  }
};
