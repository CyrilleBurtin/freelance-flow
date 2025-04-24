'use client';

import useGetClients from '@/app/api/queries/useGetClients';
import { useSession } from '@/auth/auth-client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';

interface Client {
  id: string;
  name: string;
}

interface SelectClientProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const SelectClient = ({ value, onChange, disabled }: SelectClientProps) => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.session.id;

  const { data: clients = [], refetch } = useGetClients(userId);

  useEffect(() => {
    const handleClientsUpdated = () => {
      refetch();
    };

    window.addEventListener('clientsUpdated', handleClientsUpdated);

    return () => {
      window.removeEventListener('clientsUpdated', handleClientsUpdated);
    };
  }, [refetch]);

  const isClientListEmpty = clients.length === 0;
  const placeholderText = isClientListEmpty ? 'auncun client' : 'clients';

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled || isClientListEmpty}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholderText} />
      </SelectTrigger>
      <SelectContent>
        {clients?.map(({ name, id }: Client) => (
          <SelectItem value={id} key={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectClient;
