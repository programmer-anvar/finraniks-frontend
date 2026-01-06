"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * Variant configuration for the Checkbox component.
 *
 * Variants:
 * - `shape`: Determines the corner rounding of the checkbox.
 *   - `"pill"` → fully rounded (pill style).
 *   - `"square"` → standard square (default).
 *
 * - `size`: Controls the dimensions of the checkbox and its inner icon.
 *   - `"sm"` → small size (4.5 units).
 *   - `"md"` → medium size (5 units, default).
 *   - `"lg"` → large size (5.5 units).
 */
const checkboxVariants = cva(
  `group peer bg-background/10 shrink-0 rounded-md border border-input ring-offset-background focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
    [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10  dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20,
    data-[state=checked]:bg-[var(--interactive)] data-[state=checked]:border-[var(--interactive)] data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground
    hover:data-[state=unchecked]:bg-[var(--background-hover)] hover:data-[state=checked]:bg-[var(--interactive)]/80
    `,
  {
    variants: {
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
      size: {
        sm: "size-4.5 [&_svg]:size-3",
        md: "size-5 [&_svg]:size-3.5",
        lg: "size-5.5 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      shape: "square",
      size: "md",
    },
  }
);

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;


/**
* A fully accessible and customizable Checkbox component built on top of Radix UI’s Checkbox.
*
* @example
* ```tsx
* import { Checkbox } from "@/components/Checkbox";
*
* export default function Example() {
*   return (
*     <div>
*       <Checkbox defaultChecked size="sm" shape="square" />
*       <Checkbox size="md" shape="pill" />
*       <Checkbox disabled />
*     </div>
*   );
* }
* ```
*
* @param {CheckboxProps} props - Props for configuring the checkbox.
* @param {"pill" | "square"} [props.shape="square"] - Shape variant of the checkbox.
* @param {"sm" | "md" | "lg"} [props.size="md"] - Size variant of the checkbox.
* @param {string} [props.className] - Additional classes to style the checkbox.
* @param {...any} [props.rest] - Additional props forwarded to Radix CheckboxPrimitive.Root.
*/
function Checkbox({
  className,
  shape,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ shape, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <svg
          width="2"
          height="2"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-data-[state=indeterminate]:hidden group-data-[state=checked]:text-white !w-3 !h-3"
        >
          <path
            d="M1.5 4L2.45056 5.36575C2.83958 5.92468 3.66129 5.93978 4.07057 5.39552L7 1.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <Minus className="hidden group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

Checkbox.displayName = "StriveUI.Checkbox";

export { Checkbox, type CheckboxProps, checkboxVariants };
