"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/**
 * `AlertDialogPortal` is a wrapper around Radix UI's `AlertDialogPrimitive.Portal`.
 *
 * It is used to render the `AlertDialog` content into a React portal (outside the DOM hierarchy
 * of the parent), usually at the end of the document body. This helps with layering and ensures
 * that dialogs appear above other content.
 *
 * A `data-slot="alert-dialog-portal"` attribute is added for easier targeting in tests or styling.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogPortal>
 *     <AlertDialogOverlay />
 *     <AlertDialogContent>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogContent>
 *   </AlertDialogPortal>
 * </AlertDialog>
 * ```
 *
 * @param props - All props supported by Radix UI `AlertDialogPrimitive.Portal`.
 */
function AlertDialogPortal(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>
) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

AlertDialogPortal.displayName = "StriveUI.AlertDialogPortal";

export {AlertDialogPortal};