import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Card CVA variants
const cardVariants = cva('card bg-base-100 shadow-lg', {
    variants: {
        size: {
            xs: 'card-xs',
            sm: 'card-sm',
            md: 'card-md',
            lg: 'card-lg',
            xl: 'card-xl',
        },
        variant: {
            default: 'border border-base-300',
            border: 'card-border border-2 border-primary',
            dash: 'card-dash border-2 border-dashed border-primary',
        },
        modifier: {
            default: '',
            side: 'card-side',
            imageFull: 'image-full',
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'default',
        modifier: 'default',
    },
});

const cardBodyVariants = cva('card-body text-base-content', {
    variants: {
        centered: {
            true: 'items-center text-center',
            false: '',
        },
    },
    defaultVariants: {
        centered: false,
    },
});

const cardTitleVariants = cva('card-title text-base-content', {
    variants: {},
});

const cardActionsVariants = cva('card-actions', {
    variants: {
        justify: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
        },
    },
    defaultVariants: {
        justify: 'end',
    },
});

// Card Component Props
interface CardProps
    extends VariantProps<typeof cardVariants> {
    children: React.ReactNode;
    className?: string;
}

interface CardBodyProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardBodyVariants> {
    children: React.ReactNode;
}

interface CardTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof cardTitleVariants> {
    children: React.ReactNode;
}

interface CardActionsProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardActionsVariants> {
    children: React.ReactNode;
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

// Card Component
const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ size, variant, modifier, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cardVariants({ size, variant, modifier, className })}
            {...props}
        />
    ),
);
Card.displayName = 'Card';

// Card Body Component
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
    ({ centered, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cardBodyVariants({ centered, className })}
            {...props}
        />
    ),
);
CardBody.displayName = 'CardBody';

// Card Title Component
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, ...props }, ref) => (
        <h2 ref={ref} className={cardTitleVariants({ className })} {...props} />
    ),
);
CardTitle.displayName = 'CardTitle';

// Card Actions Component
const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
    ({ justify, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cardActionsVariants({ justify, className })}
            {...props}
        />
    ),
);
CardActions.displayName = 'CardActions';

// Card Image Component (Figure wrapper)
const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
    ({ className, ...props }, ref) => (
        <figure>
            <img ref={ref} className={className} {...props} />
        </figure>
    ),
);
CardImage.displayName = 'CardImage';

export type {
    CardProps,
    CardBodyProps,
    CardTitleProps,
    CardActionsProps,
    CardImageProps,
};
export {
    Card,
    CardActions,
    CardBody,
    CardImage,
    CardTitle,
    cardActionsVariants,
    cardBodyVariants,
    cardTitleVariants,
    cardVariants,
};
