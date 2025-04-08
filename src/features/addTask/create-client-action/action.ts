'use server';

import checkFormData from '@/lib/checkFormData';
import getUser from '@/lib/getUser';
import { PrismaClient } from '@prisma/client';

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
    await prisma.client.create({
      data: {
        name: rawFormData.name,
        email: rawFormData.email,
        userId: user?.id,
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

export default createClient;
