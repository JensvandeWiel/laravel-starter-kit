import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Checkbox CVA variants
const checkboxVariants = cva('checkbox', {
    variants: {
        size: {
            xs: 'checkbox-xs',
            sm: 'checkbox-sm',
            md: 'checkbox-md',
            lg: 'checkbox-lg',
            xl: 'checkbox-xl',
        },
        color: {
            primary: 'checkbox-primary',
            secondary: 'checkbox-secondary',
            accent: 'checkbox-accent',
            neutral: 'checkbox-neutral',
            info: 'checkbox-info',
            success: 'checkbox-success',
            warning: 'checkbox-warning',
            error: 'checkbox-error',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'primary',
    },
});

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof checkboxVariants> & {
        indeterminate?: boolean;
    };

/**
 * Checkbox component
 * @example
 * <Checkbox checked onChange={(e) => setChecked(e.target.checked)} />
 * <Checkbox size="lg" color="success" />
 * <Checkbox indeterminate disabled />
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, size, color, indeterminate, ...props }, ref) => {
        const inputRef = React.useRef<HTMLInputElement>(null);
        const resolvedRef = ref || inputRef;

        React.useEffect(() => {
            if (resolvedRef && typeof resolvedRef !== 'function') {
                resolvedRef.current!.indeterminate = indeterminate ?? false;
            }
        }, [indeterminate, resolvedRef]);

        return (
            <input
                ref={resolvedRef}
                type="checkbox"
                className={checkboxVariants({ size, color, className })}
                {...props}
            />
        );
    },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };

