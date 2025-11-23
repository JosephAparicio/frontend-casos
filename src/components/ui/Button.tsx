import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-gradient-to-r from-nxt-purple to-nxt-magenta text-white shadow-lg hover:shadow-nxt-purple/50 hover:brightness-125 hover:scale-[1.02] active:scale-95 border-0 transition-all duration-200',
                destructive:
                    'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-red-500/30 hover:scale-[1.02] transition-all',
                outline:
                    'border-2 border-nxt-border bg-transparent hover:bg-nxt-purple/10 hover:text-nxt-cyan hover:border-nxt-cyan hover:scale-[1.02] transition-all',
                secondary:
                    'bg-nxt-card-bg text-nxt-text hover:bg-nxt-border',
                ghost:
                    'hover:bg-nxt-purple/20 hover:text-nxt-cyan hover:scale-110 transition-all',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
