import { z } from 'zod';

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, 'El nombre de usuario es requerido')
        .trim(),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(1, 'El nombre de usuario es requerido')
        .trim(),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
