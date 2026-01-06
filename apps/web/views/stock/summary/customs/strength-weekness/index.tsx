"use client";
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const formatLabel = (key: string) =>
    key
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());


const StrengthWeekness = memo(({ data }: Record<string, any[]>) => {
    const scrollRef = useRef<HTMLUListElement | null>(null);

    const keys = useMemo(() => (data ? Object.keys(data) : []), [data]);
    const [activeKey, setActiveKey] = useState<string>("");

    const items = useMemo(
        () => (activeKey && data ? data[activeKey as any] ?? [] : []),
        [activeKey, data]
    );

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    /* ----------------------------- Init active tab ---------------------------- */
    useEffect(() => {
        if (keys.length && !activeKey) {
            setActiveKey(keys[0]);
        }
    }, [keys, activeKey]);

    /* ----------------------------- Scroll checks ------------------------------ */
    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll, keys]);

    /* ----------------------------- Scroll action ------------------------------ */
    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    const getColors = (type: string) => {
        switch (type) {
            case "positive":
                return "bg-green-400";
            case "negative":
                return "bg-red-400";
            case "neutral":
                return "bg-orange-400"
        }
    }

    return (
        <Card className='rounded-[20px] p-4 md:p-6 space-y-4'>
            <Typography variant="h4">Strength & Weekness</Typography>
            <div className="flex items-center gap-2">
                {showLeft && (
                    <button
                        onClick={() => scroll("left")}
                        aria-label="Scroll left"
                        className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-white/60 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-purple-400"
                    >
                        ‹
                    </button>
                )}

                <div className="flex-1 overflow-hidden">
                    <ul
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-none  no-scrollbar scrollable border-b"
                    >
                        {keys.map((key) => {
                            const isActive = activeKey === key;
                            return (
                                <li key={key} className="shrink-0">
                                    <button
                                        onClick={() => setActiveKey(key)}
                                        className={`px-3 py-1 text-sm transition
                        ${isActive
                                                ? "text-purple-600 border-b border-purple-500"
                                                : "text-white/60 hover:text-white"
                                            }`}
                                    >
                                        {formatLabel(key)}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {showRight && (
                    <button
                        onClick={() => scroll("right")}
                        aria-label="Scroll right"
                        className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-white/60 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-purple-400"
                    >
                        ›
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="mt-4 space-y-3">
                {items.map((item: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-[10px_1fr] items-start gap-3">
                        <span
                            className={`mt-1 size-3 rounded-xs ${getColors(item.type)}`}
                        />
                        <p className="text-sm text-white/80">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </Card>
    )
})

export default StrengthWeekness