'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface Client {
  id: string;
  name: string;
}

const SelectClient = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();

    // Écouter les événements de mise à jour des clients
    const handleClientsUpdated = () => {
      fetchClients();
    };

    window.addEventListener('clientsUpdated', handleClientsUpdated);

    return () => {
      window.removeEventListener('clientsUpdated', handleClientsUpdated);
    };
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data.clients);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    } finally {
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="client" />
        </SelectTrigger>
        <SelectContent>
          {clients?.map(({ name, id }) => (
            <SelectItem value={id} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectClient;
