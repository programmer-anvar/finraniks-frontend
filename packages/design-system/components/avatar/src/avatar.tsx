"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type * as React from "react";

import { AvatarFallback } from "./avatar-fallback";
import { AvatarImage } from "./avatar-image";
import { type AvatarProps, useAvatar } from "./use-avatar";
import { cn } from "@finranks/design-system/lib/utils";

/**
 * Base Avatar component built on top of Radix AvatarPrimitive.Root.
 *
 * This provides the fundamental container for rendering an avatar,
 * with consistent sizing, rounded styling, and overflow handling.
 *
 * Use this when you want fine-grained control over the image/fallback
 * children instead of the higher-level `Avatar` component.
 *
 * @param {React.ComponentProps<typeof AvatarPrimitive.Root>} props
 *   Props passed directly to Radix's AvatarPrimitive.Root.
 *   You can provide className, event handlers, and other standard
 *   React/HTML attributes supported by the Radix primitive.
 *
 * @returns {JSX.Element} The base avatar wrapper.
 *
 * @example
 * ```tsx
 * <AvatarBase>
 *   <AvatarImage src="/profile.jpg" alt="User" />
 *   <AvatarFallback>AB</AvatarFallback>
 * </AvatarBase>
 * ```
 */
export function AvatarBase({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

/**
 * High-level Avatar component with built-in logic for handling
 * image, fallback, and base container props.
 *
 * Uses `useAvatar` hook to generate props for:
 * - `AvatarBase`: container props
 * - `AvatarImage`: image source/alt handling
 * - `AvatarFallback`: fallback text or UI
 *
 * This is the preferred component when you want to render
 * an avatar with automatic fallback behavior.
 *
 * @param {AvatarProps} props - Props used by the `useAvatar` hook to
 *   configure base, image, and fallback rendering.
 *
 * @returns {JSX.Element} The rendered Avatar with image and fallback.
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="/profile.jpg"
 *   alt="Jane Doe"
 *   fallback="JD"
 *   className="h-10 w-10"
 * />
 * ```
 */
const Avatar = (props: AvatarProps) => {
  const { getBaseProps, getImgProps, getFallbackProps } = useAvatar(props);
  return (
    <AvatarBase {...getBaseProps()}>
      <AvatarImage key={props?.src} {...getImgProps()} />
      <AvatarFallback {...getFallbackProps()} />
    </AvatarBase>
  );
};

Avatar.displayName = "StriveUI.Avatar";

export { Avatar };
