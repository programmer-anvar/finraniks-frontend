import {
  Tabs,
  TabsList,
  tabsListVariants,
  TabsTrigger,
  TabsTriggerProps,
} from "@finranks/design-system/components/tabs"
import { Badge } from "@finranks/design-system/components/badge";
import { Button } from "@finranks/design-system/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@finranks/design-system/components/dropdown";
import { ChevronDown, LucideIcon } from "lucide-react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@finranks/design-system/lib/utils";
interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon | null;
  count?: number | null;
}

interface ResponsiveTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  tablistProps?: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;
  tabTriggerProps?: TabsTriggerProps;
  classNames?: {
    container?: string;
    tablist?: string;
    tabTrigger?: string;
  };
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  tablistProps,
  tabTriggerProps,
  classNames,
}) => {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map());
  const prevWidth = useRef<number>(0);

  const { visibleTabs, hiddenTabs } = useMemo(() => {
    const visible = tabs.filter((t) => visibleIds.has(t.id));
    const hidden = tabs.filter((t) => !visibleIds.has(t.id));
    return { visibleTabs: visible, hiddenTabs: hidden };
  }, [tabs, visibleIds, tabs?.length]);

  const getTabWidth = useCallback((tab: TabItem): number => {
    const el = tabRefs.current.get(tab.id);
    if (el) return el.offsetWidth;
    return 70 + tab.label.length * 8 + (tab.count ? 24 : 0);
  }, []);

  const calculateVisible = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth - 24;
    const isExpanding = width > prevWidth.current;
    prevWidth.current = width;

    const GAP = 6;
    const dropdownWidth = 90;

    let total = 0;
    const newVisible = new Set<string>();
    const orderedTabs = isExpanding ? tabs : [...visibleTabs, ...hiddenTabs];

    for (const tab of orderedTabs) {
      const tabW = getTabWidth(tab) + GAP;
      const remaining = tabs.length - newVisible.size - 1;
      const needsDropdown = remaining > 0;
      const required = total + tabW + (needsDropdown ? dropdownWidth : 0);

      if (newVisible.size === 0 || required <= width) {
        newVisible.add(tab.id);
        total += tabW;
      } else break;
    }

    if (newVisible.size === 0 && tabs.length > 0) newVisible.add(tabs[0].id);

    setVisibleIds((prev) => {
      if (prev.size !== newVisible.size) return newVisible;
      for (const id of newVisible) if (!prev.has(id)) return newVisible;
      for (const id of prev) if (!newVisible.has(id)) return newVisible;
      return prev;
    });
  }, [tabs, visibleTabs, hiddenTabs, getTabWidth]);

  useEffect(() => {
    calculateVisible();
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => calculateVisible());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [calculateVisible]);

  return (
    <div
      ref={containerRef}
      className={cn("flex items-end h-10 w-full", classNames?.container)}
    >
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList
          variant="line"
          size="md"
          className="flex gap-1 p-0 overflow-x-hidden translate-y-[1px]"
          {...tablistProps}
        >
          {visibleTabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              tabRefs={tabRefs}
              {...tabTriggerProps}
            />
          ))}
        </TabsList>
      </Tabs>

      {hiddenTabs.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "ml-2 h-[28px] px-2  mb-1.5 border border-transparent !bg-transparent !hover:bg-transparent hover:border-border hover:border !hover:text-[var(--text-primary)]", 
                hiddenTabs.some((t) => t.id === activeTab) &&
                "border-border dark:border-border bg-accent"
              )}
              prepend={
                <span className="text-xs text-muted-foreground">
                  +{hiddenTabs.length} more
                </span>
              }
            >
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[180px]">
            {hiddenTabs.map((tab) => (
              <DropdownMenuItem
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  activeTab === tab.id &&
                  "bg-[var(--background-selected)] text-[var(--text-primary)]"
                )}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                <span className="flex-1 truncate">{tab.label}</span>
                {typeof tab.count === "number" && tab.count > 0 && (
                  <Badge variant="outline" size="sm" className="ml-auto ">
                    {tab.count}
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

interface TabButtonProps {
  tab: TabItem;
  tabRefs: any;
  size?: "lg" | "sm" | "xs" | "md";
}

const sizeClasses = {
  lg: "text-lg",
  sm: "text-sm",
  xs: "text-xs",
  md: "text-md",
};

const TabButton = memo(
  ({ tab, tabRefs, size = "md", ...props }: TabButtonProps) => (
    <TabsTrigger
      key={tab.id}
      value={tab.id}
      ref={(el) => {
        if (el) tabRefs.current.set(tab.id, el);
        else tabRefs.current.delete(tab.id);
      }}
      className="!pb-[5.5px]"
      {...props}
    >
      {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
      <span className={cn("text-[14px]", sizeClasses[size])}>{tab.label}</span>
      {typeof tab.count === "number" && tab.count > 0 && (
        <Badge
          variant="outline"
          size="xs"
          className="rounded-sm text-[10px] ml-1"
        >
          {tab.count}
        </Badge>
      )}
    </TabsTrigger>
  )
);

TabButton.displayName = "TabButton";

export { ResponsiveTabs, type ResponsiveTabsProps, type TabItem };
