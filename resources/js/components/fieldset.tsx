import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Fieldset CVA variants
const fieldsetVariants = cva('fieldset', {
    variants: {
        size: {
            xs: 'w-xs',
            sm: 'w-sm',
            md: 'w-md',
            lg: 'w-lg',
            full: 'w-full',
        },
        variant: {
            default: '',
            bordered: 'bg-base-200 border border-base-300 p-4 rounded-box',
        },
    },
    defaultVariants: {
        size: 'full',
        variant: 'default',
    },
});

const fieldsetLegendVariants = cva('fieldset-legend', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
            xl: 'text-xl',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> &
    VariantProps<typeof fieldsetVariants> & {
        children?: React.ReactNode;
    };

type FieldsetLegendProps = React.HTMLAttributes<HTMLLegendElement> &
    VariantProps<typeof fieldsetLegendVariants> & {
        children?: React.ReactNode;
    };

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
    ({ className, size, variant, children, ...props }, ref) => (
        <fieldset
            ref={ref}
            className={fieldsetVariants({ size, variant, className })}
            {...props}
        >
            {children}
        </fieldset>
    ),
);
Fieldset.displayName = 'Fieldset';

const FieldsetLegend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
    ({ className, size, children, ...props }, ref) => (
        <legend
            ref={ref}
            className={fieldsetLegendVariants({ size, className })}
            {...props}
        >
            {children}
        </legend>
    ),
);
FieldsetLegend.displayName = 'FieldsetLegend';

export { Fieldset, FieldsetLegend };
export type { FieldsetProps, FieldsetLegendProps };
