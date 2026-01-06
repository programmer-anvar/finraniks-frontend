"use client";
import { cn } from "@finranks/design-system/lib/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/**
 * `AlertDialogTitle` provides the heading text for the Alert Dialog.
 *
 * It is built on top of Radix UI’s `AlertDialogPrimitive.Title`, with:
 * - Semantic accessibility (announced by screen readers as the dialog’s title).
 * - Default styles for emphasis (`text-lg font-semibold`).
 * - A `data-slot="alert-dialog-title"` attribute for styling/testing.
 *
 * @example
 * ```tsx
 * <AlertDialogTitle>
 *   Delete account
 * </AlertDialogTitle>
 * ```
 *
 * @param props - Accepts all props from `AlertDialogPrimitive.Title`,
 * plus `className` for custom styling.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

AlertDialogTitle.displayName = "StriveUI.AlertDialogTitle";

export { AlertDialogTitle };
