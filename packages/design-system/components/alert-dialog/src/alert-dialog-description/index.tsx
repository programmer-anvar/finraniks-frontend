"use client";
import { cn } from "@finranks/design-system/lib/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/**
 * `AlertDialogDescription` provides the descriptive text content for an Alert Dialog.
 *
 * It is built on top of Radix UI’s `AlertDialogPrimitive.Description`, with:
 * - Semantic accessibility (announced as the dialog’s supporting description).
 * - Default styles for secondary text (`text-sm text-muted-foreground`).
 * - A `data-slot="alert-dialog-description"` attribute for styling/testing.
 *
 * Use this component to give users additional context about the dialog action,
 * e.g., consequences of deleting, logging out, or performing a critical operation.
 *
 * @example
 * ```tsx
 * <AlertDialogDescription>
 *   This action cannot be undone. Your data will be permanently deleted.
 * </AlertDialogDescription>
 * ```
 *
 * @param props - Accepts all props from `AlertDialogPrimitive.Description`,
 * plus `className` for custom styling.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export { AlertDialogDescription };
