import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string({
      required_error: 'Ce champ est requis',
      invalid_type_error: 'Doit être une chaîne de caractères',
    })
    .min(2, { message: 'Le titre doit contenir au moins 2 caractères.' })
    .max(50, { message: 'Le titre doit contenir moins de 50 caractères.' }),
  deadline: z.coerce.date({
    required_error: 'Ce champ est requis',
    invalid_type_error: 'Date invalide',
  }),
});
