"use client";

import React, { JSX, useMemo } from "react";
import { cn, getInitials } from "@finranks/design-system/lib/utils";
import { TooltipWrapper } from "@finranks/design-system/components/tooltip";
import { AvatarBase } from "../avatar";
import { AvatarImage } from "../avatar-image";
import { AvatarFallback } from "../avatar-fallback";
import { getColorById } from "@finranks/design-system/lib/color";
import { Popover, PopoverContent, PopoverTrigger } from "@finranks/design-system/components/popover";

type Size = "sm" | "md" | "lg";

interface AvatarGroupProps<T> {
  /** Array of items to render avatars for */
  items: T[];
  /** Function to extract a unique ID for each item */
  getId: (item: T) => string | number;
  /** Function to extract the display name for each item */
  getName: (item: T) => string;
  /** Optional function to get the avatar image URL for an item */
  getImageUrl?: (item: T) => string | undefined | null;
  /** Additional CSS classes for the container */
  className?: string;
  /** Maximum number of avatars to display before showing a `+N more` indicator */
  maxVisible?: number;
  /** Size of the avatars */
  size?: "sm" | "md" | "lg";
  /** Override class names for internal elements */
  classNames?: {
    /** Class names for the avatar wrapper */
    avatar?: string;
    /** Class names for the fallback text (initials) */
    fallback?: string;
    /** Class names for the tooltip content */
    tooltip?: string;
  };
}

/**
 * Size-to-className mapping for avatar sizing.
 */
const sizeClasses: Record<Size, string> = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
} as const;

/**
 * Internal AvatarGroup renderer. Handles slicing, fallbacks,
 * and "+N more" indicator.
 *
 * @template T - The type of items in the `items` array.
 */
function AvatarGroupInner<T>({
  items,
  getId,
  getName,
  getImageUrl,
  className,
  maxVisible = 5,
  size = "md",
  classNames,
}: AvatarGroupProps<T>) {
  const { visibleItems, remainingCount } = useMemo(() => {
    const visible = items.slice(0, maxVisible);
    const remaining = Math.max(0, items.length - maxVisible);
    return { visibleItems: visible, remainingCount: remaining };
  }, [items, maxVisible]);

  const avatars = useMemo(
    () =>
      visibleItems.map((item) => {
        const idStr = String(getId(item));
        const name = getName(item);
        const src = getImageUrl?.(item) || undefined;
        return { idStr, name, src };
      }),
    [visibleItems, getId, getName, getImageUrl]
  );

  if (!avatars.length && remainingCount === 0) {
    return <div className={cn("flex", className)} aria-hidden="true" />;
  }

  return (
    <div className={cn("flex -space-x-1", className)}>
      {avatars.map(({ idStr, name, src }) => (
        <TooltipWrapper
          key={idStr}
          content={name}
          classNames={{ content: classNames?.tooltip }}
        >
          <AvatarBase
            aria-label={name}
            className={cn(
              sizeClasses[size],
              "hover:z-10 focus:z-10",
              classNames?.avatar
            )}
          >
            {src ? (
              <AvatarImage
                src={src}
                alt={name}
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <AvatarFallback
              className={cn(getColorById(idStr), classNames?.fallback)}
            >
              {getInitials(name)}
            </AvatarFallback>
          </AvatarBase>
        </TooltipWrapper>
      ))}

      {remainingCount > 0 && (
        <Popover>
          <PopoverTrigger className="bg-transparent! rounded-md!">
            <TooltipWrapper
              content={`+${remainingCount} more`}
              classNames={{
                content: classNames?.tooltip,
              }}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium border hover:z-10",
                  sizeClasses[size]
                )}
              >
                +{remainingCount}
              </div>
            </TooltipWrapper>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 glass_background backdrop-blur-md border-border">
            <div className="flex flex-col gap-2 max-h-60 overflow-auto">
              {items.slice(maxVisible).map((item) => {
                const idStr = String(getId(item));
                const name = getName(item);
                const src = getImageUrl?.(item) || undefined;

                return (
                  <div
                    key={idStr}
                    className="flex items-center gap-2"
                    title={name}
                  >
                    <AvatarBase className={cn(sizeClasses[size])}>
                      {src ? (
                        <AvatarImage src={src} alt={name} loading="lazy" decoding="async" />
                      ) : null}
                      <AvatarFallback className={getColorById(idStr)}>
                        {getInitials(name)}
                      </AvatarFallback>
                    </AvatarBase>
                    <span className="text-sm">{name}</span>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}


/**
 * AvatarGroup component renders a group of avatars with optional tooltips,
 * image fallbacks, and a "+N more" indicator when the list exceeds `maxVisible`.
 *
 * It is generic, so you can pass any type of `items` as long as you provide
 * the `getId`, `getName`, and optionally `getImageUrl` accessors.
 *
 * @template T - The type of items in the `items` array.
 *
 * @param {Object} props - The props for the AvatarGroup component.
 * @param {T[]} props.items - Array of items to render avatars for.
 * @param {(item: T) => string | number} props.getId - Function to extract a unique ID for each item.
 * @param {(item: T) => string} props.getName - Function to extract the display name for each item.
 * @param {(item: T) => string | undefined | null} [props.getImageUrl] - Optional function to get the avatar image URL for an item.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {number} [props.maxVisible=5] - Maximum number of avatars to display before showing a `+N more` indicator.
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Size of the avatars.
 * @param {Object} [props.classNames] - Override class names for internal elements.
 * @param {string} [props.classNames.avatar] - Class names for the avatar wrapper.
 * @param {string} [props.classNames.fallback] - Class names for the fallback text (initials).
 * @param {string} [props.classNames.tooltip] - Class names for the tooltip content.
 *
 * @returns {JSX.Element} The rendered AvatarGroup component.
 *
 * @example
 * ```tsx
 * <AvatarGroup
 *   items={users}
 *   getId={(user) => user.id}
 *   getName={(user) => user.fullName}
 *   getImageUrl={(user) => user.avatarUrl}
 *   maxVisible={3}
 *   size="sm"
 * />
 * ```
 */
const AvatarGroup = React.memo(AvatarGroupInner) as <T>(
  props: AvatarGroupProps<T>
) => JSX.Element;

export { AvatarGroup };
