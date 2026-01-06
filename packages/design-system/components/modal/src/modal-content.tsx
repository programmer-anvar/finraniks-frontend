import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ModalPortal } from "./modal-portal";
import { ModalOverlay } from "./modal-overlay";
import { XIcon } from "lucide-react";
import { cn } from "@finranks/design-system/lib/utils";

export interface ModalContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  readonly classNames?: {
    content?: string;
    closeButton?: string;
    innerContent?: string;
    overLay?: string;
  };
  closeButtonProps?: React.ComponentProps<typeof DialogPrimitive.Close>;
  withOverlay?: boolean;
}

export function ModalContent({
  className,
  children,
  classNames,
  closeButtonProps,
  withOverlay = true,
  ...props
}: ModalContentProps) {
  return (
    <ModalPortal data-slot="dialog-portal">
      {withOverlay && <ModalOverlay key={String(withOverlay)} className={classNames?.overLay} />}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200  sm:max-w-lg rounded-[16px] backdrop-blur-lg",
          className,
          classNames?.content
        )}
        {...props}
      >
        <div className={cn("rounded-[13px] bg-[linear-gradient(0deg,#12092C,#12092C),linear-gradient(331.86deg,rgba(35,18,51,0)_48.86%,rgba(35,18,51,0.1)_96.18%)] shadow-[inset_0_4px_40px_0_#ffffff1a]", classNames?.innerContent)}>{children}</div>
        <DialogPrimitive.Close
          {...closeButtonProps}
          className={cn(
            "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-3 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer hover:bg-[var(--background-hover)] size-6 rounded-md flex items-center justify-center",
            classNames?.closeButton
          )}
        >
          <XIcon className="cursor-pointer" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}
