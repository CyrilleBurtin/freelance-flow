'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClient } from '@/features/create-client/action';
import { clientSchema } from '@/features/create-client/clientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ClientSchema = z.output<typeof clientSchema>;

const CreateClient = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: ClientSchema) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);

    startTransition(async () => {
      const result = await createClient(formData);

      if (result?.success && result?.fields?.name) {
        toast.success(`${result.fields.name} créé avec succès`, {
          duration: 5000,
          position: 'top-right',
        });
        const event = new CustomEvent('clientsUpdated');
        window.dispatchEvent(event);

        router.refresh();
        setIsOpen(false);
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-10">
        <Button className="cursor-pointer">+</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Ajout d'un nouveau client</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClient;
