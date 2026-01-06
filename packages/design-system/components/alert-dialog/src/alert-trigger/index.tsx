"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

/**
 * `AlertDialogTrigger` is a wrapper around Radix UI's `AlertDialogPrimitive.Trigger`.
 *
 * It is used to open the corresponding `AlertDialog` when interacted with (e.g. click).
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>
 *     <button>Delete</button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 *
 * @param props - All props supported by Radix UI `AlertDialogPrimitive.Trigger`
 *                (extends from `React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>`).
 */
function AlertDialogTrigger(
  props: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}

AlertDialogTrigger.displayName = "StriveUI.AlertDialogTrigger";

export { AlertDialogTrigger };