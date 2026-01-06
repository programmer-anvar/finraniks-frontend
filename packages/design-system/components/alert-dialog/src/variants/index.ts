import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer ",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--button-background-base)] shadow-button-custom text-white hover:bg-[var(--button-background-hover)] rounded-[8px] transition-colors transition-shadow duration-200 active:bg-[var(--button-background-active)]",
                destructive:
                    "bg-[var(--button-destructive-background-base)] text-white  shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-[var(--button-destructive-background-active)] active:bg-[var(--button-destructive-background-active)]",

                "destructive-outline":
                    "border border-[var(--button-destructive-background-base)]  bg-transparent text-destructive hover:text-white shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-base)] dark:focus-visible:ring-[var(--button-destructive-background-base)]  active:bg-[var(--button-destructive-background-active)]",
                "destructive-ghost":
                    "border-none bg-transparent text-destructive hover:text-white hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-hover)] dark:focus-visible:ring-destructive/40 dark:bg-[var(--button-destructive-background-active)] active:bg-[var(--button-destructive-background-active)]",
                outline:
                    "border bg-[var(--layer-01)] shadow-xs hover:bg-[var(--background-hover)] hover:text-accent-foreground",
                secondary:
                    "bg-[var(--button-secondary-background-base)]  text-white  hover:bg-[var(--button-secondary-background-hover)] active:bg-[var(--button-secondary-background-active)]",
                ghost:
                    "hover:bg-[var(--background-hover)] hover:text-accent-foreground dark:hover:bg-[var(--background-hover)]",
                link: "text-[var(--text-primary)] underline-offset-4 hover:underline",
            },
            size: {
                md: "h-8 px-4 py-2 has-[>svg]:px-3",
                sm: "h-6.5 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-6.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export { buttonVariants };
