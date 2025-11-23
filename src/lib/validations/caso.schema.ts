import { z } from 'zod';
import { EstadoCaso } from '@/lib/types/caso';

export const casoSchema = z.object({
    nombre: z
        .string()
        .min(1, 'El nombre es requerido')
        .trim(),
    descripcion: z
        .string()
        .min(1, 'La descripción es requerida')
        .trim(),
    estado: z.enum(EstadoCaso).optional(),
});

export type CasoFormData = z.infer<typeof casoSchema>;
