import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
                    className={cn(
                        'flex min-h-[80px] w-full rounded-md border-2 bg-nxt-card-bg px-3 py-2 text-sm text-nxt-text placeholder:text-nxt-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nxt-purple focus-visible:ring-offset-2 focus-visible:ring-offset-nxt-dark-bg disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none',
                        error ? 'border-red-500' : 'border-nxt-border',
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                    {...props}
                />
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
Textarea.displayName = 'Textarea';

export { Textarea };
