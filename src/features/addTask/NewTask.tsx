'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="fixed right-20 bottom-20 cursor-pointer bg-green-500">
            +
          </Button>
        </DialogTrigger>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"></div>
        <DialogContent>
          <DialogTitle>Création d'une nouvelle tâche</DialogTitle>
          <form action={handleFormAction}>
            {error && (
              <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
                {error}
              </div>
            )}
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Échéance</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="flex gap-4">
                <SelectClient />
                <NewClient />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewTask;
