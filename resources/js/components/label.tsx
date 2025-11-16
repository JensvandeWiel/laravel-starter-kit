import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Label wrapper for inputs/selects (inline label)
const labelWrapperVariants = cva('', {
    variants: {
        type: {
            input: 'input',
            select: 'select',
        },
    },
    defaultVariants: {
        type: 'input',
    },
});

// Label text inside the wrapper
const labelTextVariants = cva('label', {
    variants: {
        variant: {
            default: 'text-base-content',
            description: 'text-base-content/70',
            error: 'text-error',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'sm',
    },
});

// Floating label wrapper
const floatingLabelVariants = cva('floating-label', {
    variants: {
        size: {
            xs: '',
            sm: '',
            md: '',
            lg: '',
            xl: '',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

type LabelWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelWrapperVariants> & {
        children?: React.ReactNode;
    };

type LabelTextProps = React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof labelTextVariants> & {
        children?: React.ReactNode;
    };

type FloatingLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof floatingLabelVariants> & {
        children?: React.ReactNode;
        label?: string;
    };

/**
 * LabelWrapper - Wraps an input or select with inline label text
 * @example
 * <LabelWrapper type="input">
 *   <LabelText>https://</LabelText>
 *   <input type="text" placeholder="URL" />
 * </LabelWrapper>
 */
const LabelWrapper = React.forwardRef<HTMLLabelElement, LabelWrapperProps>(
    ({ className, type, children, ...props }, ref) => (
        <label
            ref={ref}
            className={labelWrapperVariants({ type, className })}
            {...props}
        >
            {children}
        </label>
    ),
);
LabelWrapper.displayName = 'LabelWrapper';

/**
 * LabelText - Text inside a label wrapper
 */
const LabelText = React.forwardRef<HTMLSpanElement, LabelTextProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <span
            ref={ref}
            className={labelTextVariants({ variant, size, className })}
            {...props}
        >
            {children}
        </span>
    ),
);
LabelText.displayName = 'LabelText';

/**
 * FloatingLabel - Label that floats above input when focused
 * @example
 * <FloatingLabel>
 *   <input type="email" placeholder="mail@site.com" className="input input-md" />
 *   <span>Your Email</span>
 * </FloatingLabel>
 */
const FloatingLabel = React.forwardRef<HTMLLabelElement, FloatingLabelProps>(
    ({ className, size, children, ...props }, ref) => (
        <label
            ref={ref}
            className={floatingLabelVariants({ size, className })}
            {...props}
        >
            {children}
        </label>
    ),
);
FloatingLabel.displayName = 'FloatingLabel';

/**
 * Label - Simple label for form fields (used as a text label, not a wrapper)
 * Commonly used with fieldset for describing inputs
 */
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelTextVariants> & { children?: React.ReactNode }>(
    ({ className, variant = 'default', size = 'md', children, ...props }, ref) => (
        <label
            ref={ref}
            className={labelTextVariants({ variant, size, className })}
            {...props}
        >
            {children}
        </label>
    ),
);
Label.displayName = 'Label';

export { Label, LabelWrapper, LabelText, FloatingLabel };
export type { LabelWrapperProps, LabelTextProps, FloatingLabelProps };

