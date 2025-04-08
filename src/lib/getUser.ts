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

  const toto = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      tasks: true,
      clients: true,
    },
  });

  console.log({ toto });

  return toto;
};

export default getUser;
