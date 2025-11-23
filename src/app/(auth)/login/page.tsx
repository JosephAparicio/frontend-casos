'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-nxt-text mb-2">
                        NXT Abogados
                    </h1>
                    <p className="text-nxt-text-muted">
                        {isRegister ? 'Crea tu cuenta para comenzar' : 'Inicia sesión para gestionar tus casos'}
                    </p>
                </div>

                <div className="bg-nxt-card-bg border-2 border-nxt-border rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-nxt-text mb-6 text-center">
                            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
                        </h2>

                        <div className="overflow-hidden relative px-1 py-2 -mx-1">
                            <div
                                className={`flex transition-transform duration-500 ease-in-out ${isRegister ? '-translate-x-full' : 'translate-x-0'
                                    }`}
                            >
                                <div className="w-full flex-shrink-0 px-1">
                                    <LoginForm setIsRegister={setIsRegister} />
                                </div>
                                <div className="w-full flex-shrink-0 px-1">
                                    <RegisterForm setIsRegister={setIsRegister} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
