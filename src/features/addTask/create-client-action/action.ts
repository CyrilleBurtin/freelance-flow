'use server';

import checkFormData from '@/lib/checkFormData/checkFormData';
import getUser from '@/lib/getUser/getUser';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createClient = async (formData: FormData) => {
  await checkFormData(formData);
  const prisma = new PrismaClient();
  const user = await getUser();
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  };
  console.log({ rawFormData });

  if (!user) {
    return { success: false, error: 'Utilisateur non authentifié' };
  }

  if (!rawFormData.name) {
    return { success: false, error: 'Le nom est obligatoire' };
  }

  try {
    const newClient = await prisma.client.create({
      data: {
        name: rawFormData.name,
        email: rawFormData.email,
        userId: user?.id,
      },
    });
    revalidatePath('/');

    return { success: true, newClient: newClient.name };
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

export default createClient;
