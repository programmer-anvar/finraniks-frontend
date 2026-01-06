import { cn } from "@finranks/design-system/lib/utils" // Assuming this is your cn utility
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// ----------------------------------------------------
// 1. CARD VARIANTS DEFINITION (The core styling logic)
// ----------------------------------------------------

/**
 * Converts your .card_background CSS into Tailwind utility classes.
 * NOTE: The 'conic-gradient' on the ::before pseudo-element cannot be handled
 * easily by standard Tailwind config alone without a custom plugin, but
 * the main background and box-shadow are converted below.
 */
const cardVariants = cva(
    "w-full flex-shrink-0 p-8 rounded-[30px] border-none", // Base/Shared Styles
    {
        variants: {
            variant: {
                primary:
                    "bg-[linear-gradient(0deg,#12092C,#12092C),linear-gradient(331.86deg,rgba(35,18,51,0)_48.86%,rgba(35,18,51,0.1)_96.18%)] " +
                    "shadow-[inset_0_4px_40px_0_#ffffff1a]",

                secondary:
                    "text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",

            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

// ----------------------------------------------------
// 2. CARD COMPONENT
// ----------------------------------------------------

// Use the return type of cardVariants for props definition
interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> { }

function Card({ className, variant, ...props }: CardProps) {
    return (
        <div
            data-slot="card"
            // Apply the variant classes and merge with any custom className
            className={cn(cardVariants({ variant, className }))}
            {...props}
        />
    )
}

// ----------------------------------------------------
// 3. SUB-COMPONENTS (Tailwind classes for layout/typography)
// ----------------------------------------------------

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                // Your original Tailwind classes
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [&.border-b]:pb-6",
                className
            )}
            {...props}
        />
    )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("leading-none font-semibold text-lg", className)}
            {...props}
        />
    )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6 [&.border-t]:pt-6", className)}
            {...props}
        />
    )
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
}