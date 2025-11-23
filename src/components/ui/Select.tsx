import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, children, ...props }, ref) => {
        return (
            <div className="w-full">
                <select
                    className={cn(
                        'flex h-10 w-full rounded-md border-2 bg-nxt-card-bg px-3 py-2 text-sm text-nxt-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nxt-purple focus-visible:ring-offset-2 focus-visible:ring-offset-nxt-dark-bg disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                        error ? 'border-red-500' : 'border-nxt-border',
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                    {...props}
                >
                    {children}
                </select>
                {error && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1 text-sm text-red-500"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Select.displayName = 'Select';

export { Select };
