import { cn } from "@finranks/design-system/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type ModalTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;

export function ModalTitle({ className, ...props }: ModalTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}
