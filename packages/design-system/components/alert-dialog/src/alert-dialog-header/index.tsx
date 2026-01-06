"use client";
import { cn } from "@finranks/design-system/lib/utils";
import * as React from "react";

/**
 * `AlertDialogHeader` is a layout wrapper for the top section of the Alert Dialog.
 *
 * It is typically used to group together the **title** and **description**
 * of the dialog, ensuring consistent spacing and alignment.
 *
 * By default:
 * - Uses a `flex flex-col gap-2` layout → stacks children vertically with spacing.
 * - Centers text on mobile (`text-center`) and aligns left on larger screens (`sm:text-left`).
 * - Adds a `data-slot="alert-dialog-header"` attribute for styling/testing hooks.
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>
 *     <AlertDialogTitle>Delete Account</AlertDialogTitle>
 *     <AlertDialogDescription>
 *       This action cannot be undone. This will permanently delete your account.
 *     </AlertDialogDescription>
 *   </AlertDialogHeader>
 *   <AlertDialogFooter>
 *     <AlertDialogCancel>Cancel</AlertDialogCancel>
 *     <AlertDialogAction>Delete</AlertDialogAction>
 *   </AlertDialogFooter>
 * </AlertDialogContent>
 * ```
 *
 * @param props - All native `div` props, plus `className` for style overrides.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export { AlertDialogHeader };
