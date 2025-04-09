'use server';

import { auth } from '@/auth/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessionUser = session?.user;

  if (!sessionUser) {
    return;
  }

  return prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      tasks: true,
      clients: true,
    },
  });
};

export default getUser;
