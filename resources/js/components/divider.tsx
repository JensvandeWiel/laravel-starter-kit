import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Divider CVA variants
const dividerVariants = cva('divider', {
    variants: {
        direction: {
            vertical: '',
            horizontal: 'divider-horizontal',
        },
        color: {
            default: '',
            neutral: 'divider-neutral',
            primary: 'divider-primary',
            secondary: 'divider-secondary',
            accent: 'divider-accent',
            success: 'divider-success',
            warning: 'divider-warning',
            info: 'divider-info',
            error: 'divider-error',
        },
        placement: {
            center: '',
            start: 'divider-start',
            end: 'divider-end',
        },
    },
    defaultVariants: {
        direction: 'vertical',
        color: 'default',
        placement: 'center',
    },
});

type DividerProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof dividerVariants> & {
        children?: React.ReactNode;
    };

/**
 * Divider component
 * @example
 * // Basic vertical divider
 * <Divider />
 * <Divider>OR</Divider>
 *
 * // Horizontal divider
 * <Divider direction="horizontal" />
 * <Divider direction="horizontal">OR</Divider>
 *
 * // With colors
 * <Divider color="primary">Login</Divider>
 * <Divider color="success" direction="horizontal">Continue</Divider>
 *
 * // With placement
 * <Divider placement="start">Start</Divider>
 * <Divider placement="end">End</Divider>
 */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
    (
        {
            className,
            direction,
            color,
            placement,
            children,
            ...props
        },
        ref,
    ) => (
        <div
            ref={ref}
            className={dividerVariants({
                direction,
                color,
                placement,
                className,
            })}
            {...props}
        >
            {children}
        </div>
    ),
);
Divider.displayName = 'Divider';

export { Divider };
export type { DividerProps };

