import { cva, type VariantProps } from 'class-variance-authority';
import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react';
import React from 'react';

// Link CVA variants
const linkVariants = cva('link', {
    variants: {
        color: {
            default: '',
            neutral: 'link-neutral',
            primary: 'link-primary',
            secondary: 'link-secondary',
            accent: 'link-accent',
            success: 'link-success',
            info: 'link-info',
            warning: 'link-warning',
            error: 'link-error',
        },
        hover: {
            always: '',
            onHover: 'link-hover',
        },
    },
    defaultVariants: {
        color: 'default',
        hover: 'always',
    },
});

type LinkProps = Omit<InertiaLinkProps, 'className'> &
    VariantProps<typeof linkVariants> & {
        className?: string;
        external?: boolean;
    };

/**
 * Link component - uses Inertia's Link for internal navigation
 * @example
 * // Internal link (uses Inertia router)
 * <Link href="/dashboard">Dashboard</Link>
 *
 * // With colors
 * <Link href="/about" color="primary">About Us</Link>
 * <Link href="/contact" color="secondary" hover="onHover">Contact</Link>
 *
 * // External link
 * <Link href="https://example.com" external>Visit Website</Link>
 *
 * // Different colors
 * <Link href="/success" color="success">Success Link</Link>
 * <Link href="/error" color="error">Error Link</Link>
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            className,
            color,
            hover,
            href = '#',
            external = false,
            children,
            ...props
        },
        ref,
    ) => {
        const linkClass = linkVariants({ color, hover, className });

        // External link - use regular anchor tag
        if (external) {
            return (
                <a
                    ref={ref}
                    href={href.toString() ?? '#'}
                    className={linkClass}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {children}
                </a>
            );
        }

        // Internal link - use Inertia Link
        return (
            <InertiaLink
                ref={ref}
                href={href}
                className={linkClass}
                {...(props as Omit<InertiaLinkProps, 'href' | 'className'>)}
            >
                {children}
            </InertiaLink>
        );
    },
);
Link.displayName = 'Link';

export { Link };
export type { LinkProps };
