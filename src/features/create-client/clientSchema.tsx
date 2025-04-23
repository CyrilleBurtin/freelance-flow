import { z } from 'zod';

export const clientSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error: 'Doit être une chaîne de caractères',
    })
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères.' })
    .max(50, { message: 'Le nom doit contenir moins de 50 caractères.' }),
  email: z
    .string({
      required_error: "L'email est requis",
      invalid_type_error: 'Email invalide',
    })
    .email({ message: 'Adresse email invalide' }),
});
