"use client";

import { cn } from "@finranks/design-system/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";
/**
 * AvatarFallback component
 *
 * This component provides a fallback UI for the Radix Avatar,
 * typically shown when the avatar image cannot be loaded or
 * has not yet rendered.
 *
 * - Uses Radix UI's `AvatarPrimitive.Fallback` under the hood.
 * - Applies default styles for a centered, rounded background.
 * - Supports additional class names and props for customization.
 *
 * @param {Object} props - The props for the AvatarFallback component.
 * @param {string} [props.className] - Additional CSS classes to merge with the default styles.
 * @param {React.ReactNode} [props.children] - Content to render inside the fallback (e.g., initials, icon).
 * @returns {JSX.Element} The rendered AvatarFallback component.
 *
 * @example
 * ```tsx
 * <AvatarFallback>
 *   JD
 * </AvatarFallback>
 *
 * <AvatarFallback className="bg-gray-300 text-white">
 *   <UserIcon />
 * </AvatarFallback>
 * ```
 */

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

AvatarFallback.displayName = "StriveUI.AvatarFallback";

export { AvatarFallback };
