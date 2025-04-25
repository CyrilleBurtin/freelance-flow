import { TASK_COLOR } from '@/features/color-picker/ColorPicker';
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  deadline: z.date({ required_error: 'La date limite est requise' }),
  clientId: z.string().optional(),
  taskColor: z.enum(TASK_COLOR).optional(), // Strict validation
});
