import { adminClient } from 'better-auth/client/plugins';
import { customSessionClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { auth } from './auth';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [adminClient(), customSessionClient<typeof auth>()],
});

export const { signIn, signOut, useSession } = authClient;
