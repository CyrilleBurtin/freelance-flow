'use server';

import { auth } from '@/auth/auth';
import { headers } from 'next/headers';

const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log({ user });

  if (!user) {
    return;
  }

  return user;
};

export default getUser;
