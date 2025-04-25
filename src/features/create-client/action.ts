'use server';

import { PrismaClient } from '@/generated/prisma/client';
import { getUser } from '@/lib/getUser/getUser';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const createClient = async (formData: FormData) => {
  const user = await getUser();

  if (!user) {
    return {
      message: 'User not authenticated',
      error: 'Utilisateur non authentifié',
    };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  try {
    const client = await prisma.client.create({
      data: {
        name,
        email,
        userId: user?.id,
      },
    });
    revalidatePath('/');

    return { success: true, message: 'Client created', fields: client };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Erreur lors de la création du client',
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default createClient;
