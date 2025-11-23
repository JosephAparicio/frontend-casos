'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth.schema';
import { authRepository } from '@/lib/api/repositories/auth.repository';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Loader } from '@/components/ui/Loader';

interface RegisterFormProps {
    setIsRegister: (value: boolean) => void;
}

export function RegisterForm({ setIsRegister }: RegisterFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            const response = await authRepository.register(data);
            toast.success(response.message);
            setIsRegister(false);
        } catch (error: unknown) {
            const errorMessage =
                (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Error al registrarse';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
                <Label htmlFor="username" required>
                    Usuario
                </Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="Elige un nombre de usuario"
                    error={errors.username?.message}
                    {...register('username')}
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" required>
                    Contraseña
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Crea una contraseña de al menos 6 caracteres"
                        error={errors.password?.message}
                        {...register('password')}
                        disabled={isLoading}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 translate-y-1/4 text-nxt-text-muted hover:text-white transition-colors"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader size="sm" />
                        Registrando...
                    </span>
                ) : (
                    'Registrarse'
                )}
            </Button>

            <div className="text-center pt-4">
                <p className="text-sm text-nxt-text-muted">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                        type="button"
                        onClick={() => setIsRegister(false)}
                        className="text-nxt-purple hover:text-nxt-cyan transition-colors font-medium"
                    >
                        Inicia sesión aquí
                    </button>
                </p>
            </div>
        </form>
    );
}
