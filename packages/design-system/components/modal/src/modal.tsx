"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  onEnterClick?: () => void;
};
export function Modal({ onEnterClick, ...props }: ModalProps) {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && onEnterClick) {
        onEnterClick();
      }
    },
    [onEnterClick]
  );

  React.useEffect(() => {
    if (!onEnterClick) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, onEnterClick]);


  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
