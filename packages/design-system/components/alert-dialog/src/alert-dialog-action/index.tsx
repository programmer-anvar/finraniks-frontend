"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "../variants";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * `AlertDialogAction` represents the **primary action button** in an Alert Dialog.
 *
 * It is built on top of Radix UI’s `AlertDialogPrimitive.Action`, with:
 * - Default button styling from `buttonVariants()`.
 * - Support for `className` overrides.
 *
 * This button is generally used for **destructive or confirming actions**
 * (e.g., "Delete", "Confirm", "Yes").
 *
 * @example
 * ```tsx
 * <AlertDialogAction>
 *   Delete account
 * </AlertDialogAction>
 * ```
 *
 * @param props - Accepts all props from `AlertDialogPrimitive.Action`,
 * plus `className` for customizing styles.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

export { AlertDialogAction };
