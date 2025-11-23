import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, required, children, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn(
                    'text-sm font-medium text-nxt-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                    className
                )}
                {...props}
            >
                {children}
                {required && <span className="text-red-500 ml-1" aria-label="requerido">*</span>}
            </label>
        );
    }
);
Label.displayName = 'Label';

export { Label };
