import getUser from '@/lib/getUser';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ tasks: [] }, { status: 401 });
  }

  const prisma = new PrismaClient();

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        deadline: true,
        status: true,
        order: true,
      },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    return NextResponse.json({ tasks: [] }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
