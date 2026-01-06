"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * A set of style variants for the `Kbd` component,
 * built with `class-variance-authority` (CVA).
 *
 * Variants:
 * - `variant`: visual style
 *    - `default`: background with border and muted text
 *    - `outline`: transparent background with border and muted text
 * - `size`: size of the key
 *    - `md`: medium (default)
 *    - `sm`: small
 *    - `xs`: extra small
 */
const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono rounded-[4px]",
  {
    variants: {
      variant: {
        default: "bg-muted border border-border text-muted-foreground",
        outline: "text-muted-foreground border border-border",
      },
      size: {
        md: "h-7 min-w-7 px-1.5 text-xs [&_svg]:size-3.5",
        sm: "h-6 min-w-6 px-1 text-[0.75rem] leading-[0.75rem] [&_svg]:size-3",
        xs: "h-4 min-w-5 px-[5px] text-[10px] leading-[0.75rem] [&_svg]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Kbd
 *
 * A styled `<kbd>` element for displaying keyboard key hints.
 * Supports variants for size and style.
 *
 * @param className - Additional classes for customization
 * @param variant - Visual style (`default` | `outline`)
 * @param size - Key size (`md` | `sm` | `xs`)
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd variant="outline" size="sm">Enter</Kbd>
 * <Kbd size="xs">Esc</Kbd>
 * ```
 */
function Kbd({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Kbd, kbdVariants };
