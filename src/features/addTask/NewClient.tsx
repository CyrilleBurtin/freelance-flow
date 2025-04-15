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
import { createClient } from '@/features/addTask/create-client-action/action';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const NewClient = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await createClient(formData);

    if (result?.success) {
      startTransition(() => {
        const id = toast(result.newClient);
        toast.success(`${result.newClient} ajouté vos clients`, {
          id,
          duration: 5000,
          position: 'top-right',
        });
        const event = new CustomEvent('clientsUpdated');
        window.dispatchEvent(event);

        router.refresh();
        setIsOpen(false);
      });
    } else if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-10">
        <Button className="cursor-pointer">+</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Ajout d'un nouveau client</DialogTitle>
        <form action={handleSubmit}>
          {error && (
            <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
              {error}
            </div>
          )}
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewClient;
