import React from "react";
import clsx from "clsx";

type AnimatedBorderProps = {
    children: React.ReactNode;

    /** animation duration in seconds */
    duration?: number;

    /** border thickness in px */
    borderSize?: number;

    /** border radius */
    radius?: string;

    /** glow / border color */
    borderColor?: string;

    /** inner background color */
    backgroundColor?: string;

    className?: string;
};

const AnimatedBorder = ({
    children,
    duration = 6,
    borderSize = 2,
    radius = "30px",
    borderColor = "rgba(240, 226, 253, 0.9)",
    backgroundColor = "#0c0325",
    className,
}: AnimatedBorderProps) => {
    return (
        <div
            className={clsx("relative", className)}
            style={{ borderRadius: radius }}
        >
            {/* rotating border */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    inset: `-${borderSize}px`,
                    borderRadius: radius,
                    background: `conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 70%,
            ${borderColor},
            transparent 100%
          )`,
                    animation: `spin ${duration}s linear infinite`,
                }}
            />

            {/* inner background */}
            <div
                className="absolute z-10"
                style={{
                    inset: borderSize,
                    borderRadius: radius,
                    background: backgroundColor,
                }}
            />

            {/* content */}
            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default AnimatedBorder;
