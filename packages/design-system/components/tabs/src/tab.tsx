"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@finranks/design-system/lib/utils";

// Variants for TabsList
const tabsListVariants = cva("flex items-center shrink-0 overflow-y-hidden", {
  variants: {
    variant: {
      default: "bg-[var(--layer-01)] p-1",
      button: "",
      line: "border-b border-border",
      icon: "bg-[var(--layer-01)] gap-1 rounded-md p-1",
    },
    shape: {
      default: "",
      pill: "",
    },
    size: {
      lg: "gap-2.5",
      md: "gap-1",
      sm: "gap-1.5",
      xs: "gap-1",
    },
  },
  compoundVariants: [
    { variant: "default", size: "lg", className: "p-1.5 gap-2.5" },
    { variant: "default", size: "md", className: "p-1 gap-2" },
    { variant: "default", size: "sm", className: "p-1 gap-1.5" },
    { variant: "default", size: "xs", className: "p-1 gap-1" },

    {
      variant: "default",
      shape: "default",
      size: "lg",
      className: "rounded-lg",
    },
    {
      variant: "default",
      shape: "default",
      size: "md",
      className: "rounded-lg",
    },
    {
      variant: "default",
      shape: "default",
      size: "sm",
      className: "rounded-md",
    },
    {
      variant: "default",
      shape: "default",
      size: "xs",
      className: "rounded-md",
    },

    { variant: "line", size: "lg", className: "gap-3" },
    { variant: "line", size: "md", className: "gap-2" },
    { variant: "line", size: "sm", className: "gap-1" },
    { variant: "line", size: "xs", className: "gap-1" },

    {
      variant: "default",
      shape: "pill",
      className: "rounded-full [&_[role=tab]]:rounded-full",
    },
    {
      variant: "button",
      shape: "pill",
      className: "rounded-full [&_[role=tab]]:rounded-full",
    },

    // 👇 extra rules for icon variant
    {
      variant: "icon",
      shape: "default",
      className: "gap-1 [&_[role=tab]]:rounded-md",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Variants for TabsTrigger
const tabsTriggerVariants = cva(
  "shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-[var(--text-primary)] [&[data-state=active]_svg]:text-[var(--text-primary)] group",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground data-[state=active]:bg-(--color-main) data-[state=active]:text-white hover:text-foreground  data-[state=active]:shadow-xs data-[state=active]:shadow-black/5  [&[data-state=active]_svg]:!text-white",
        button:
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg text-accent-foreground hover:text-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground",
        line: "border-b-[1px] text-muted-foreground border-transparent data-[state=active]:border-[var(--text-primary)]  hover:text-[var(--text-primary)] data-[state=active]:text-[var(--text-primary)]",
        icon: "p-1 !rounded-[5px] hover:bg-[var(--layer-01)] data-[state=active]:bg-[var(--layer-02)] [&_svg]:size-5 data-[state=active]:bg-[var(--interactive)] data-[state=active]:text-white [&[data-state=active]_svg]:!text-white",
      },
      size: {
        lg: "gap-2.5 [&_svg]:size-5 text-base", 
        md: "gap-0 [&_svg]:size-3.5 text-[14px]",
        sm: "gap-1.5 [&_svg]:size-3.5 text-[14px]",
        xs: "gap-1 [&_svg]:size-3.5 text-xs",
      },
    },
    compoundVariants: [
      { variant: "default", size: "lg", className: "py-1 px-4 rounded-md" },
      { variant: "default", size: "md", className: "py-1.5 px-3 rounded-md" },
      {
        variant: "default",
        size: "sm",
        className: "py-[1.5px] px-2 rounded-sm text-[10px]",
      },
      {
        variant: "default",
        size: "xs",
        className: "py-[1.8px] px-2 rounded-md text-[10px]",
      },

      { variant: "button", size: "lg", className: "py-2.5 px-4 rounded-lg" },
      { variant: "button", size: "md", className: "py-2.5 px-3 rounded-lg" },
      {
        variant: "button",
        size: "sm",
        className: "py-[5.5px] px-2 rounded-md text-[10px]",
      },
      {
        variant: "button",
        size: "xs",
        className: "py-[5.5px] px-2 rounded-md text-[10px]",
      },

      { variant: "line", size: "lg", className: "pb-[10px]" },
      { variant: "line", size: "md", className: "py-[3.5px] text-[14px]" },
      { variant: "line", size: "sm", className: "py-[1.8px] text-[12px]" },
      { variant: "line", size: "xs", className: "py-[1.8px] text-[10px]" },

      {
        variant: "icon",
        size: "lg",
        className: "py-[5px] px-2 text-[10px] size-8 data-[state=active]:text-white",
      },
      {
        variant: "icon",
        size: "md",
        className: "py-[5px] px-2 text-[10px] size-6 data-[state=active]:text-white",
      },
      {
        variant: "icon",
        size: "sm",
        className: "py-[5px] px-2 text-[10px] size-5 data-[state=active]:text-white",
      },
      {
        variant: "icon",
        size: "xs",
        className: "py-[5.5px] px-2  text-[10px] size-4 data-[state=active]:text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Variants for TabsContent
const tabsContentVariants = cva(
  "mt-2.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        icon: "mt-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Context
type TabsContextType = {
  variant?: "default" | "button" | "line" | "icon";
  size?: "lg" | "sm" | "xs" | "md";
};
const TabsContext = React.createContext<TabsContextType>({
  variant: "default",
  size: "md",
});

// Components
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = "default",
  shape = "default",
  size = "md",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsContext.Provider
      value={{ variant: variant || "default", size: size || "md" }}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, shape, size }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  space?: string;
}

function TabsTrigger({
  className,
  space,
  ...props
}: TabsTriggerProps) {
  const { variant, size } = React.useContext(TabsContext);

  if (variant === "line") {
    return (
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn(tabsTriggerVariants({ variant, size }), "pb-2", className)}
        {...props}
      >
        <div className="border border-transparent group-data-[state=active]:border-border group-data-[state=active]:rounded-md flex items-center gap-1 p-1 hover:border-border hover:rounded-md relative px-2">
          {props.children}
        </div>


      </TabsPrimitive.Trigger>
    );
  }

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,

  type TabsTriggerProps,
};
