'use server';

import { auth } from '@/auth/auth';
import { PrismaClient } from '@/generated/prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export const getUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const sessionUser = session?.user;

    if (!sessionUser) {
      return undefined;
    }

    return await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: {
        tasks: true,
        clients: true,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return undefined;
  }
};
