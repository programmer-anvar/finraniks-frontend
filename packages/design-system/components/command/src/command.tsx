"use client";

import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@finranks/design-system/components/modal";
import { cn } from "@finranks/design-system/lib/utils";


/**
 * StriveUI Command Palette
 *
 * A collection of composable primitives built on top of `cmdk` and Radix `Modal`
 * for implementing a command palette or searchable action menu.
 *
 * @remarks
 * - Wraps `cmdk` primitives with StriveUI styling, semantics, and accessibility.
 * - Provides a `CommandDialog` wrapper for displaying the palette inside a modal.
 * - All parts (input, list, group, item, etc.) are individually exportable
 *   for maximum customization.
 *
 * @example
 * ```tsx
 * import {
 *   CommandDialog,
 *   CommandInput,
 *   CommandList,
 *   CommandEmpty,
 *   CommandGroup,
 *   CommandItem,
 *   CommandShortcut,
 * } from "@ebrai/strive/components/Command";
 *
 * export default function Example() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <CommandDialog open={open} onOpenChange={setOpen}>
 *       <CommandInput placeholder="Search commands..." />
 *       <CommandList>
 *         <CommandEmpty>No results found.</CommandEmpty>
 *         <CommandGroup heading="General">
 *           <CommandItem>
 *             New File <CommandShortcut>⌘N</CommandShortcut>
 *           </CommandItem>
 *           <CommandItem>
 *             Open File <CommandShortcut>⌘O</CommandShortcut>
 *           </CommandItem>
 *         </CommandGroup>
 *       </CommandList>
 *     </CommandDialog>
 *   );
 * }
 * ```
 *
 * @see {@link https://cmdk.paco.me | cmdk documentation}
 */

/**
 * Root container for the command palette.
 * Provides keyboard navigation, item selection, and command search logic.
 *
 * @param {CommandProps} props - Props forwarded to `cmdk.Command`.
 */
type CommandProps = React.ComponentProps<typeof CommandPrimitive>;
function Command({ className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-[var(--layer-01)] text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md rounded-lg border sm:max-w-[748px] md:min-w-[450px] top-[20%]",
        className
      )}
      {...props}
    />
  );
}

Command.displayName = "StriveUI.Command";

type CommandDialogProps = React.ComponentProps<typeof Modal> & {
  title?: string;
  description?: string;
};


/**
 * A modal wrapper around the command palette.
 * Provides accessible title, description, and modal content.
 *
 * @param {CommandDialogProps} props - Props forwarded to StriveUI `Modal`.
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: CommandDialogProps) {
  return (
    <Modal {...props}>
      <ModalHeader className="sr-only">
        <ModalTitle className="text-xs">{title}</ModalTitle>
        <ModalDescription>{description}</ModalDescription>
      </ModalHeader>
      <ModalContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </ModalContent>
    </Modal>
  );
}

CommandDialog.displayName = "StriveUI.CommandDialog";

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>;

/**
 * Search input field for filtering commands.
 *
 * @param {CommandInputProps} props - Props forwarded to `cmdk.Command.Input`.
 */
function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

CommandInput.displayName = "StriveUI.CommandInput";

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>;

/**
 * List of commands to display in the palette.
 *
 * @param {CommandListProps} props - Props forwarded to `cmdk.Command.List`.
 */
function CommandList({ className, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

CommandList.displayName = "StriveUI.CommandList";

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>;

/**
 * Empty state for the command palette.
 *
 * @param {CommandEmptyProps} props - Props forwarded to `cmdk.Command.Empty`.
 */
function CommandEmpty({ ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

CommandEmpty.displayName = "StriveUI.CommandEmpty";

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>;

/**
 * Group of commands to display in the palette.
 *
 * @param {CommandGroupProps} props - Props forwarded to `cmdk.Command.Group`.
 */
function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  );
}

CommandGroup.displayName = "StriveUI.CommandGroup";

type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>;

/**
 * Separator between groups of commands.
 *
 * @param {CommandSeparatorProps} props - Props forwarded to `cmdk.Command.Separator`.
 */
function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

CommandSeparator.displayName = "StriveUI.CommandSeparator";

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>;

/**
 * Individual command item in the palette.
 *
 * @param {CommandItemProps} props - Props forwarded to `cmdk.Command.Item`.
 */
function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex  items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 py-1 h-7 cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

CommandItem.displayName = "StriveUI.CommandItem";

type CommandShortcutProps = React.ComponentProps<"span">;

/**
 * Shortcut key for a command item.
 *
 * @param {CommandShortcutProps} props - Props forwarded to `cmdk.CommandShortcut`.
 */
function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

CommandShortcut.displayName = "StriveUI.CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  type CommandProps,
  type CommandDialogProps,
  type CommandInputProps,
  type CommandListProps,
  type CommandEmptyProps,
  type CommandGroupProps,
  type CommandItemProps,
  type CommandShortcutProps,
  type CommandSeparatorProps,
};
