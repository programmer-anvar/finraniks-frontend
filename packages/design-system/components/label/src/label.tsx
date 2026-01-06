"use client";
import { useLabel, type UseLabelProps as LabelProps } from "./use-label";

/**
 * Label
 *
 * A flexible and accessible label component that integrates
 * with the `useLabel` hook to provide proper label behavior,
 * props forwarding, and support for required field indicators.
 *
 * @param props - Props passed into `useLabel`, including:
 * - `as` (optional): Custom component or HTML element to render as the label
 * - `id` (optional): ID to associate the label with a form control
 * - `required` (optional): Whether the label should render a required indicator (`*`)
 * - Any additional props supported by the `useLabel` hook
 *
 * @example
 * ```tsx
 * <Label htmlFor="username">Username</Label>
 *
 * <Label required htmlFor="password">
 *   Password
 * </Label>
 *
 * <Label as="span" required>
 *   Custom Label
 * </Label>
 * ```
 */
export const Label = (props: LabelProps) => {
  const {
    Component,
    children,
    getLabelProps,
    getRequiredIndicatorProps,
    required,
  } = useLabel(props);

  return (
    // @ts-ignore
    <Component {...getLabelProps()}>
      {children}
      {required && (
        <span {...getRequiredIndicatorProps()} aria-hidden="true">
          *
        </span>
      )}
    </Component>
  );
};
