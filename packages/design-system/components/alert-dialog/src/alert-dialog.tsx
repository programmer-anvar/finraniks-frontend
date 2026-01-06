"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

/**
 * `AlertDialog` is the root component that manages the open/close state of the dialog.
 *
 * It is a wrapper around Radix UI’s `AlertDialogPrimitive.Root` and should wrap
 * all other `AlertDialog` subcomponents (`Trigger`, `Content`, `Title`, `Description`, `Action`, `Cancel`, etc.).
 *
 * Adds a `data-slot="alert-dialog"` attribute for styling/testing hooks.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <button>Delete account</button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone. Your account and all data will be permanently deleted.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Delete</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 *
 * @param props - Accepts all props from `AlertDialogPrimitive.Root`.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

AlertDialog.displayName = "StriveUI.AlertDialog";

export { AlertDialog };
