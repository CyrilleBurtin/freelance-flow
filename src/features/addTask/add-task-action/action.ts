'use server';

import getUser from '@/lib/getUser/getUser';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
  error?: string;
};

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

  console.log(clientId);

  try {
    await prisma.task.create({
      data: {
        title,
        deadline,
        clientId: clientId || null,
        userId: user?.id,
        status: 'pending',
        order: 0,
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
