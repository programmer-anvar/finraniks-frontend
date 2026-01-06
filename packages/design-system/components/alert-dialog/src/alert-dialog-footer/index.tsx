"use client";
import { cn } from "@finranks/design-system/lib/utils";
import * as React from "react";

/**
 * `AlertDialogFooter` is a layout wrapper for the bottom section of the Alert Dialog.
 *
 * It is typically used to hold **actions** (e.g., Cancel / Confirm buttons).
 *
 * By default:
 * - Stacks buttons vertically (`flex-col-reverse gap-2`) on mobile, with the primary action last.
 * - Switches to a horizontal layout (`sm:flex-row`) on larger screens.
 * - Aligns actions to the right (`sm:justify-end`) for conventional dialog UX.
 * - Adds a `data-slot="alert-dialog-footer"` attribute for styling/testing hooks.
 *
 * @example
 * ```tsx
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Delete</AlertDialogAction>
 * </AlertDialogFooter>
 * ```
 *
 * @param props - All native `div` props, plus `className` for style overrides.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

export { AlertDialogFooter };
