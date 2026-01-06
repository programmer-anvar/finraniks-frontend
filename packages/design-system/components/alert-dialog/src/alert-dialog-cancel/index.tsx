"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "../variants";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * `AlertDialogCancel` represents the **secondary action button** in an Alert Dialog.
 *
 * It is built on top of Radix UI’s `AlertDialogPrimitive.Cancel`, with:
 * - Default button styling using `buttonVariants({ variant: "outline" })`.
 * - Support for `className` overrides.
 *
 * This button is typically used for **safe dismissals** such as "Cancel", "Close",
 * or "Go back", and is often paired with `AlertDialogAction`.
 *
 * @example
 * ```tsx
 * <AlertDialogCancel>
 *   Cancel
 * </AlertDialogCancel>
 * <AlertDialogAction>
 *   Delete
 * </AlertDialogAction>
 * ```
 *
 * @param props - Accepts all props from `AlertDialogPrimitive.Cancel`,
 * plus `className` for custom styling.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export { AlertDialogCancel };
