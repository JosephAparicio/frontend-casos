'use client';

import { useState } from 'react';

interface AuthPanelProps {
    children: [React.ReactNode, React.ReactNode];
}

export function AuthPanel({ children }: AuthPanelProps) {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold gradient-nxt-text mb-2">
                    NXT Legal-Tech
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

                    <div className="overflow-hidden relative">
                        <div
                            className={`flex transition-transform duration-500 ease-in-out ${isRegister ? '-translate-x-full' : 'translate-x-0'
                                }`}
                        >
                            <div className="w-full flex-shrink-0">
                                {typeof children[0] === 'function'
                                    ? (children[0] as (props: { setIsRegister: (value: boolean) => void }) => React.ReactNode)({ setIsRegister })
                                    : children[0]}
                            </div>
                            <div className="w-full flex-shrink-0">
                                {typeof children[1] === 'function'
                                    ? (children[1] as (props: { setIsRegister: (value: boolean) => void }) => React.ReactNode)({ setIsRegister })
                                    : children[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
