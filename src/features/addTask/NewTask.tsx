'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AddClient from '@/features/addTask/NewClient';
import { createTask } from '@/features/addTask/add-task-action/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type UserWithClients = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  clients?: {
    id: string;
    name: string;
    email: string;
  }[];
};

const NewTask = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createTask(formData);

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
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed top-20 left-20 cursor-pointer bg-green-500">
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent className="absolute top-0 left-0 w-96">
          <form action={handleSubmit}>
            {error && (
              <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
                {error}
              </div>
            )}
            <div className="w-full space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" type="text" required />
              </div>
              <div>
                <Label htmlFor="deadline">Échéance</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  required
                />
              </div>
              <AddClient />
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NewTask;
