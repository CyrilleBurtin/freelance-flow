'use client';

import { QUERY_KEYS } from '@/app/api/queries/queryKeys';
import { getQueryKey } from '@/lib/getQueryKey';
import { useQuery } from '@tanstack/react-query';

const fetchTasks = async () => {
  const response = await fetch('/api/tasks');

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des taches');
  }

  const { tasks } = await response.json();

  return tasks;
};

const useGetTasks = () => {
  return useQuery({
    queryKey: getQueryKey(QUERY_KEYS.TASKS),
    queryFn: fetchTasks,
  });
};

export default useGetTasks;
