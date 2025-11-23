'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { authRepository } from '@/lib/api/repositories/auth.repository';

export function Header() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authRepository.logout();
            toast.success('Sesión cerrada exitosamente');
            router.push('/login');
        } catch (error) {
            toast.error('Error al cerrar sesión');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="bg-nxt-card-bg border-b-2 border-nxt-border py-4">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/casos"
                        className="hover:scale-105 hover:brightness-110 transition-all duration-300 block"
                        aria-label="Ir al inicio"
                    >
                        <Image
                            src="/nxt-logo.svg"
                            alt="NXT Logo"
                            width={80}
                            height={32}
                            priority
                        />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold gradient-nxt-text hidden md:block">
                            Gestión de Casos
                        </h1>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    aria-label="Cerrar sesión"
                >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                </Button>
            </div>
        </header>
    );
}
