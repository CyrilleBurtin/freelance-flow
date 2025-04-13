'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-10">
        <Button className="cursor-pointer">+</Button>
      </PopoverTrigger>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <PopoverAnchor />
      </div>
      <PopoverContent
        side="top"
        onInteractOutside={(e) => e.stopPropagation()}
        onPointerDownOutside={(e) => e.stopPropagation()}
      >
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
          <Button className="cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? 'Ajout en cours...' : 'Ajouter'}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NewClient;
