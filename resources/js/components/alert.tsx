import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { CircleCheck, CircleAlert, CircleX, Info } from 'lucide-react';

// Alert CVA variants
const alertVariants = cva('alert', {
    variants: {
        color: {
            info: 'alert-info',
            success: 'alert-success',
            warning: 'alert-warning',
            error: 'alert-error',
        },
        style: {
            default: '',
            outline: 'alert-outline',
            dash: 'alert-dash',
            soft: 'alert-soft',
        },
        direction: {
            horizontal: '',
            vertical: 'alert-vertical',
        },
        animation: {
            none: '',
            fadeIn: 'animate-in fade-in duration-300',
            slideInDown: 'animate-in slide-in-from-top-4 duration-300',
            slideInRight: 'animate-in slide-in-from-right-4 duration-300',
            bounce: 'animate-in bounce-in duration-500',
        },
    },
    defaultVariants: {
        color: 'info',
        style: 'default',
        direction: 'horizontal',
        animation: 'none',
    },
});

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & {
        icon?: React.ReactNode;
        title?: React.ReactNode;
        description?: React.ReactNode;
        action?: React.ReactNode;
        children?: React.ReactNode;
        autoIcon?: boolean;
    };

/**
 * Get automatic icon based on color
 */
const getAutoIcon = (color?: string) => {
    switch (color) {
        case 'success':
            return <CircleCheck />;
        case 'warning':
            return <CircleAlert />;
        case 'error':
            return <CircleX />;
        case 'info':
        default:
            return <Info />;
    }
};

/**
 * Alert component
 * @example
 * // Basic alert with auto icon
 * <Alert color="info">
 *   12 unread messages. Tap to see.
 * </Alert>
 *
 * // With custom icon
 * <Alert color="info" icon={<CustomIcon />}>
 *   12 unread messages. Tap to see.
 * </Alert>
 *
 * // With animation
 * <Alert color="success" animation="slideInDown">
 *   Your purchase has been confirmed!
 * </Alert>
 *
 * // With title and description
 * <Alert color="success" title="New message!" description="You have 1 unread message" />
 *
 * // With action button
 * <Alert color="warning" direction="vertical">
 *   <span>Warning: Invalid email address!</span>
 *   <div>
 *     <button className="btn btn-sm">OK</button>
 *   </div>
 * </Alert>
 *
 * // Soft style
 * <Alert color="error" style="soft">
 *   Error! Task failed successfully.
 * </Alert>
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            color,
            style,
            direction,
            animation,
            icon,
            title,
            description,
            action,
            children,
            autoIcon = true,
            ...props
        },
        ref,
    ) => {
        const displayIcon = icon || (autoIcon ? getAutoIcon(color) : null);

        return (
            <div
                ref={ref}
                role="alert"
                className={alertVariants({
                    color,
                    style,
                    direction,
                    animation,
                    className,
                })}
                {...props}
            >
                {displayIcon && displayIcon}
                {children ? (
                    children
                ) : (
                    <>
                        {(title || description) && (
                            <div>
                                {title && <h3 className="font-bold">{title}</h3>}
                                {description && (
                                    <div className="text-xs">{description}</div>
                                )}
                            </div>
                        )}
                    </>
                )}
                {action && action}
            </div>
        );
    },
);
Alert.displayName = 'Alert';

export { Alert };
export type { AlertProps };
