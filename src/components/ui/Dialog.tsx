import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
                aria-hidden="true"
            />
            {children}
        </div>
    );
}

export function DialogContent({ children, className, title }: DialogContentProps) {
    return (
        <div
            className={cn(
                'relative z-50 w-full max-w-lg bg-nxt-card-bg border-2 border-nxt-border rounded-lg shadow-2xl p-6 animate-in fade-in-0 zoom-in-95',
                className
            )}
        >
            {title && (
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-nxt-text">{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
}

export function DialogClose({ onClose }: { onClose: () => void }) {
    return (
        <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-nxt-dark-bg transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-nxt-purple focus:ring-offset-2"
            aria-label="Cerrar"
        >
            <X className="h-5 w-5 text-nxt-text" />
        </button>
    );
}
