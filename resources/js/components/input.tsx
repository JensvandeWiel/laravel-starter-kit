import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Input CVA variants
const inputVariants = cva('input w-full', {
    variants: {
        size: {
            xs: 'input-xs',
            sm: 'input-sm',
            md: 'input-md',
            lg: 'input-lg',
            xl: 'input-xl',
        },
        colorVariant: {
            default: 'input-neutral border-base-300',
            neutral: 'input-neutral border-base-300',
            primary: 'input-primary border-primary',
            secondary: 'input-secondary border-secondary',
            accent: 'input-accent border-accent',
            info: 'input-info border-info',
            success: 'input-success border-success',
            warning: 'input-warning border-warning',
            error: 'input-error border-error',
        },
        variant: {
            default: '',
            ghost: 'input-ghost',
        },
    },
    defaultVariants: {
        size: 'md',
        colorVariant: 'default',
        variant: 'default',
    },
});

const inputWrapperVariants = cva('input flex items-center gap-2', {
    variants: {
        size: {
            xs: 'input-xs',
            sm: 'input-sm',
            md: 'input-md',
            lg: 'input-lg',
            xl: 'input-xl',
        },
        colorVariant: {
            default: 'input-neutral',
            neutral: 'input-neutral',
            primary: 'input-primary',
            secondary: 'input-secondary',
            accent: 'input-accent',
            info: 'input-info',
            success: 'input-success',
            warning: 'input-warning',
            error: 'input-error',
        },
        variant: {
            default: '',
            ghost: 'input-ghost',
        },
    },
    defaultVariants: {
        size: 'md',
        colorVariant: 'default',
        variant: 'default',
    },
});

type InputVariants = VariantProps<typeof inputVariants>;
type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;

// Input Component Props
interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputVariants['size'];
    colorVariant?: InputVariants['colorVariant'];
    variant?: InputVariants['variant'];
}

interface InputWrapperProps
    extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'color'> {
    size?: InputWrapperVariants['size'];
    colorVariant?: InputWrapperVariants['colorVariant'];
    variant?: InputWrapperVariants['variant'];
    children: React.ReactNode;
}

// Input Component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ size, colorVariant, variant, className, ...props }, ref) => (
        <input
            ref={ref}
            className={inputVariants({ size, colorVariant, variant, className })}
            {...props}
        />
    ),
);
Input.displayName = 'Input';

// Input Wrapper Component (for inputs with icons, labels, etc.)
const InputWrapper = React.forwardRef<HTMLLabelElement, InputWrapperProps>(
    ({ size, colorVariant, variant, className, children, ...props }, ref) => (
        <label
            ref={ref}
            className={inputWrapperVariants({ size, colorVariant, variant, className })}
            {...props}
        >
            {children}
        </label>
    ),
);
InputWrapper.displayName = 'InputWrapper';

export type { InputProps, InputWrapperProps };
export { Input, InputWrapper, inputVariants, inputWrapperVariants };
