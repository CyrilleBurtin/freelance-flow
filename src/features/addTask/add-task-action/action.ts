'use server';

import { auth } from '@/auth/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export const createTask = async (formData: FormData) => {
  const formDataObj = Object.fromEntries(formData.entries());
  console.log('FormData content:', formDataObj);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log({ user });

  if (!user) {
    return;
  }

  const rawFormData = {
    title: formData.get('title') as string,
    deadline: formData.get('deadline') as string,
    clientId: formData.get('clientId') as string | null,
  };
  console.log({ rawFormData });

  const hasEmptyValues = Object.entries(rawFormData).some(
    ([key, value]) => key !== 'clientId' && (value === null || value === ''),
  );

  if (hasEmptyValues) {
    return {
      success: false,
      error: 'Le titre et la date limite sont obligatoires',
    };
  }

  try {
    await prisma.task.create({
      data: {
        title: rawFormData.title,
        deadline: new Date(rawFormData.deadline),
        clientId: rawFormData.clientId || null,
        userId: user.id,
        status: 'pending',
        order: 0,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Erreur lors de la création de la tâche' };
  } finally {
    await prisma.$disconnect();
  }
};
