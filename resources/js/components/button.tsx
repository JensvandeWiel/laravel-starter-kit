import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Button CVA variants
const buttonVariants = cva('btn', {
    variants: {
        color: {
            neutral: 'btn-neutral',
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            accent: 'btn-accent',
            info: 'btn-info',
            success: 'btn-success',
            warning: 'btn-warning',
            error: 'btn-error',
        },
        style: {
            default: '',
            outline: 'btn-outline',
            dash: 'btn-dash',
            soft: 'btn-soft',
            ghost: 'btn-ghost',
            link: 'btn-link',
        },
        size: {
            xs: 'btn-xs',
            sm: 'btn-sm',
            md: 'btn-md',
            lg: 'btn-lg',
            xl: 'btn-xl',
        },
        shape: {
            default: '',
            circle: 'btn-circle',
            square: 'btn-square',
            wide: 'btn-wide',
            block: 'btn-block',
        },
        state: {
            default: '',
            active: 'btn-active',
            disabled: 'btn-disabled',
        },
        glass: {
            true: 'glass',
            false: '',
        },
        noAnimation: {
            true: 'no-animation',
            false: '',
        },
    },
    defaultVariants: {
        color: 'neutral',
        style: 'default',
        size: 'md',
        shape: 'default',
        state: 'default',
        glass: false,
        noAnimation: false,
    },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
        children?: React.ReactNode;
    };

/**
 * Button component
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * // With variants
 * <Button color="primary" size="lg">Large Primary Button</Button>
 * <Button color="success" style="soft">Soft Success</Button>
 * <Button color="warning" style="outline">Outline Warning</Button>
 *
 * // Shapes
 * <Button shape="circle" size="lg">Icon</Button>
 * <Button shape="square">Icon</Button>
 * <Button shape="wide">Wide Button</Button>
 * <Button shape="block">Full Width</Button>
 *
 * // States
 * <Button isLoading>Loading...</Button>
 * <Button state="active">Active</Button>
 * <Button disabled>Disabled</Button>
 *
 * // Modifiers
 * <Button glass>Glass Effect</Button>
 * <Button noAnimation>No Animation</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            color,
            style,
            size,
            shape,
            state,
            glass,
            noAnimation,
            isLoading,
            disabled,
            children,
            ...props
        },
        ref,
    ) => {
        const buttonState = isLoading ? 'disabled' : disabled ? 'disabled' : state;

        return (
            <button
                ref={ref}
                className={buttonVariants({
                    color,
                    style,
                    size,
                    shape,
                    state: buttonState,
                    glass,
                    noAnimation,
                    className,
                })}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && (
                    <span className="loading loading-spinner loading-sm" />
                )}
                {children}
            </button>
        );
    },
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
