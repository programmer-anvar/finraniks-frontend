"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * A wrapper around Radix UI's {@link AspectRatioPrimitive.Root}.
 *
 * The `AspectRatio` component maintains a consistent aspect ratio
 * for its child content (e.g., images, videos, or other media).
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="bg-muted">
 *   <img src="/example.jpg" alt="Example" className="object-cover w-full h-full" />
 * </AspectRatio>
 * ```
 *
 * @remarks
 * - Uses `data-slot="aspect-ratio"` for easier testing/styling hooks.
 * - Passes all props directly to Radix UI's `AspectRatioPrimitive.Root`.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/aspect-ratio
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

AspectRatio.displayName = "StriveUI.AspectRatio";

export { AspectRatio };
