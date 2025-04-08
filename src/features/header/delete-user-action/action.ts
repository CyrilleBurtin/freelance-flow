'use server';

import { auth } from '@/auth/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

const DeleteUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return;
  }

  try {
    await prisma.user.delete({
      where: {
        id: session.user?.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default DeleteUser;
