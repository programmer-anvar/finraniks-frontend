"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AlertDialogPortal } from "../alert-dialog-portal";
import { AlertDialogOverlay } from "../alert-dialog-overlay";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * `AlertDialogContent` is the main container of the Alert Dialog.
 *
 * It wraps Radix UI's `AlertDialogPrimitive.Content` and automatically
 * renders the `AlertDialogPortal` and `AlertDialogOverlay` so you
 * don’t need to add them manually.
 *
 * By default, it is centered on the screen and comes with
 * animations for fade/zoom transitions.
 *
 * Default Tailwind utility classes include:
 * - **Layout**: `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`
 *   → centers the dialog.
 * - **Size**: `w-full max-w-[calc(100%-2rem)] sm:max-w-lg`
 *   → full width on small screens, constrained on larger ones.
 * - **Styling**: `rounded-lg border bg-background p-6 shadow-lg`
 *   → gives it a modal look.
 * - **Animation**: `data-[state=open]:animate-in data-[state=closed]:animate-out`
 *   → smooth entry/exit transitions with fade + zoom.
 *
 * A `data-slot="alert-dialog-content"` attribute is added for
 * easier testing and consistent styling hooks.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *     <AlertDialogDescription>
 *       This action cannot be undone. This will permanently delete your account.
 *     </AlertDialogDescription>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Delete</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 *
 * @param props - All props supported by Radix UI `AlertDialogPrimitive.Content`.
 *                Accepts `className` to extend or override default styles.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          " data-[state=open]:animate-in data-[state=closed]:animate-out " +
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
            "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] " +
            "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 " +
            "shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export { AlertDialogContent };
