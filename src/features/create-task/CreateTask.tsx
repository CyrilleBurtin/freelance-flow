'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import CreateClient from '@/features/create-client/CreateClient';
import SelectClient from '@/features/create-task/SelectClient';
import { createTask } from '@/features/create-task/action';
import { taskSchema } from '@/features/create-task/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type TaskSchema = z.infer<typeof taskSchema>;

const CreateTask = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      deadline: undefined,
      clientId: '',
    },
  });

  async function onSubmit(data: TaskSchema) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('deadline', data.deadline.toISOString());
    if (data.clientId) {
      formData.append('clientId', data.clientId); // Append clientId if it exists
    }

    startTransition(async () => {
      const result = await createTask(formData);

      if (result.success) {
        toast.success('Tâche créée avec succès');
        form.reset();
        setIsOpen(false);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed right-20 bottom-20 cursor-pointer bg-green-500">
          +
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Création d&apos;une nouvelle tâche</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de la tâche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date limite</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <SelectClient
                        value={field.value}
                        onChange={field.onChange}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CreateClient />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
