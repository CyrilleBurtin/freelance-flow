'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SelectClient from '@/features/addTask/SelectClient';
import { createClient } from '@/features/addTask/create-client-action/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewClient = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createClient(formData);
    if (!result) {
      setError('Une erreur est survenue');
      return;
    }

    if (result.success) {
      router.refresh();
      return;
    }

    if ('needsClient' in result && result.needsClient) {
      router.push('/clients/new');
      return;
    }

    setError(result.error || 'Une erreur est survenue');
  };

  return (
    <div className="flex gap-4">
      <SelectClient />
      <Popover>
        <PopoverTrigger asChild>
          <Button>Nouveau client</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={handleSubmit}>
            {error && (
              <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
                {error}
              </div>
            )}
            <Label htmlFor="name">Nom</Label>
            <Input id="name" name="name" type="text" required />
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            <Button type="submit">Ajouter</Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NewClient;
