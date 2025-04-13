'use client';

import { QUERY_KEYS } from '@/app/api/queries/queryKeys';
import { getQueryKey } from '@/lib/getQueryKey';
import { useQuery } from '@tanstack/react-query';

export interface Client {
  id: string;
  name: string;
}

export async function fetchClients(): Promise<Client[]> {
  const response = await fetch('/api/routes/clients');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des clients');
  }
  const { clients } = await response.json();

  return clients;
}

const useGetClients = (userId: string | undefined) => {
  return useQuery({
    queryKey: getQueryKey(QUERY_KEYS.USER, userId),
    queryFn: fetchClients,
  });
};

export default useGetClients;
