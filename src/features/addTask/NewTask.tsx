'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import NewClient from '@/features/addTask/NewClient';
import SelectClient from '@/features/addTask/SelectClient';
import { createTask } from '@/features/addTask/add-task-action/action';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const NewTask = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleFormAction = async (formData: FormData) => {
    const result = await createTask(formData);

    if (result?.success) {
      startTransition(() => {
        router.refresh();
        setIsOpen(false);
      });
    } else if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="fixed top-20 left-20 cursor-pointer bg-green-500">
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent className="absolute top-0 left-0 w-96">
          <form action={handleFormAction}>
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
              <div className="flex">
                <SelectClient />
                <NewClient />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NewTask;
