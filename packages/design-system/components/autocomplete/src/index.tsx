import { Popover, PopoverAnchor, PopoverContent } from "@finranks/design-system/components/popover";
import type { PopoverProps } from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Loader } from "lucide-react";
import { type ComponentProps, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { SearchInput } from "../../search-input";
import { Command, CommandGroup, CommandItem, CommandList } from "../../command";
import { cn } from "@finranks/design-system/lib/utils";
import { Typography } from "../../typography";
import { CheckIcon } from "@finranks/design-system/shared/icons/check-icon";

export type AutoCompleteProps<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { value: T; label: string }[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  onEnterClick?: (value: T) => void;
  popoverProps?: PopoverProps;
  classNames?: {
    popoverContent?: string;
    command?: string;
    commandInput?: string;
    commandList?: string;
    commandGroup?: string;
    commandItem?: string;
    commandEmpty?: string;
  };
  searchProps?: ComponentProps<typeof SearchInput>;
};

export function AutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  placeholder = "Search...",
  onEnterClick,
  popoverProps,
  classNames,
  searchProps,
}: AutoCompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

  const labels = useMemo(
    () =>
      items?.reduce(
        (acc, item) => {
          acc[item.value] = item.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    [items]
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.hasAttribute("cmdk-list")) {
      // reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    onSelectedValueChange(inputValue as T);
    onSearchValueChange(labels[inputValue] ?? "");
    setOpen(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const onEnterClickHandler = () => {
    if (onEnterClick) {
      onEnterClick(searchValue as T);
      onSelectedValueChange(searchValue as T);
      reset();
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        inputRef.current === document.activeElement &&
        !items?.length &&
        onEnterClick
      ) {
        e.preventDefault();
        onEnterClickHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue, items?.length, onEnterClick]);

  useEffect(() => {
    if (!selectedValue) {
      onSearchValueChange("");
    }
  }, [selectedValue]);

  useEffect(() => {
    if (open && inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [open]);



  return (
    <Popover open={open} onOpenChange={setOpen} {...popoverProps}>
      <Command
        shouldFilter={false}
        className={cn("min-w-[100%]! border-none", classNames?.command)}
      >
        <PopoverAnchor asChild className="border-none! bg-transparent!">
          <SearchInput
            ref={inputRef as any}
            {...searchProps}
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
            onMouseDown={() => setOpen((open) => !!searchValue || !open)}
            onFocus={() => setOpen(true)}
            onBlur={onInputBlur}
            clearIconDescription="Clear"
            classNames={{
              searchIcon: "hidden",
              input: "pl-3 bg-transparent! dark:bg-background!",
            }}
            placeholder={placeholder}
            size="md"
            onClear={reset}
          />
        </PopoverAnchor>
        {!open && items?.length > 0 && (
          <CommandList aria-hidden="true" className="hidden" />
        )}
        {open && items?.length > 0 && (
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className={cn(
              "rounded-md p-0 !bg-transparent !backdrop-blur-md w-full",
              classNames?.popoverContent
            )}
          >
            <CommandList className="w-full! p-0" >
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="flex items-center justify-center gap-2 p-1">
                    <Loader className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Loading...
                    </span>
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items?.length > 0 && !isLoading ? (
                <CommandGroup className="w-full!">
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                      style={{ width: Number(inputWidth) - 6 }}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="grid">
                          <Typography variant="small" truncate>
                            {option.label}
                          </Typography>
                        </div>
                        {selectedValue === option.value && (
                          <CheckIcon className={cn("size-2")} />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </PopoverContent>
        )}
      </Command>
    </Popover>
  );
}
