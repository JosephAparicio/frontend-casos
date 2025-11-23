import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
};

const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
};

export function Loader({ size = 'md', className }: LoaderProps) {
    return (
        <div className={cn('relative', sizeMap[size], className)} role="status" aria-live="polite" aria-label="Cargando">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nxt-cyan via-nxt-purple to-nxt-magenta animate-pulse" />
            <div className="absolute inset-1 rounded-full bg-nxt-dark-bg flex items-center justify-center">
                <Briefcase className={cn('text-white animate-pulse', iconSizeMap[size])} />
            </div>
        </div>
    );
}
