import getUser from '@/lib/getUser';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ clients: [] }, { status: 401 });
  }

  const prisma = new PrismaClient();

  try {
    const clients = await prisma.client.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    return NextResponse.json({ clients: [] }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
