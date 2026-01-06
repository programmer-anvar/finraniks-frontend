"use client";
import { cn } from "@finranks/design-system/lib/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/**
 * `AlertDialogOverlay` is a wrapper around Radix UI's `AlertDialogPrimitive.Overlay`.
 *
 * It provides a semi-transparent backdrop behind the dialog and handles
 * enter/exit animations by default. This helps dim the background
 * and keep focus on the dialog content.
 *
 * A `data-slot="alert-dialog-overlay"` attribute is included for
 * consistent styling and easier targeting in tests.
 *
 * Tailwind utility classes are applied by default:
 * - `fixed inset-0 z-50` → ensures overlay covers the entire viewport.
 * - `bg-black/50` → gives a 50% black backdrop.
 * - `data-[state=open]:fade-in-0` and `data-[state=closed]:fade-out-0` → animate opacity transitions.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogPortal>
 *     <AlertDialogOverlay />
 *     <AlertDialogContent>
 *       <AlertDialogTitle>Confirm</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         Are you sure you want to proceed?
 *       </AlertDialogDescription>
 *     </AlertDialogContent>
 *   </AlertDialogPortal>
 * </AlertDialog>
 * ```
 *
 * @param props - All props supported by Radix UI `AlertDialogPrimitive.Overlay`.
 *                Accepts `className` to extend or override default styles.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
          "fixed inset-0 z-50 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

export { AlertDialogOverlay };
