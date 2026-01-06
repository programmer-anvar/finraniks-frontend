"use client";

import { cn } from "@finranks/design-system/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";


/**
 * AvatarImage component
 *
 * This component renders an image inside the Radix Avatar,
 * providing a styled square aspect ratio by default.
 *
 * - Wraps Radix UI's `AvatarPrimitive.Image`.
 * - Ensures the image fills the available space with a square ratio.
 * - Accepts additional class names for customization.
 *
 * @param {Object} props - The props for the AvatarImage component.
 * @param {string} [props.className] - Extra CSS classes to extend or override default styles.
 * @param {string} [props.src] - The source URL of the avatar image.
 * @param {string} [props.alt] - Alternative text description of the image.
 * @returns {JSX.Element} The rendered AvatarImage component.
 *
 * @example
 * ```tsx
 * <AvatarImage src="/profile.jpg" alt="User profile picture" />
 *
 * <AvatarImage
 *   src="/profile.jpg"
 *   alt="User profile picture"
 *   className="rounded-full object-cover"
/>
 * ```
 */

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

AvatarImage.displayName = "StriveUI.AvatarImage";

export { AvatarImage };
