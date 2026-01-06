"use client"
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    // Note: Recharts doesn't strictly need this, but it's good practice
    // to include the ResponsiveContainer if you want automatic resizing
    // import { ResponsiveContainer } from "recharts" 
} from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../base"; // Assuming your base components are here

// --- Type Definitions for Better Genericity and Safety ---

/**
 * A generic data object for a chart.
 * It must have an 'angleKey' field (e.g., 'month') and one or more value fields.
 */
type ChartDataItem = Record<string, any>;

/**
 * Configuration for a single Radar line.
 * It includes the data key, label, and style properties.
 */
interface RadarLineConfig {
    /** The key in the data object that holds the values for this radar line (e.g., 'desktop'). */
    dataKey: string;
    /** The display label for this line (used in the tooltip/legend). */
    label: string;
    /** The CSS variable color (e.g., 'var(--chart-1)'). */
    color: string;
    /** Optional fill opacity for the radar area (0.0 to 1.0). */
    fillOpacity?: number;
}

/**
 * Props for the generic Radar Chart component.
 */
interface GenericRadarChartProps {
    /** The array of data objects. */
    data: ChartDataItem[];
    /** The key in the data object to use for the angular axis (e.g., 'month'). */
    angleKey: string;
    /** An array of configurations for each radar line to be drawn. */
    radarLines: RadarLineConfig[];
    /** Optional: The type of grid to use ('polygon' or 'circle'). Defaults to 'circle'. */
    gridType?: "polygon" | "circle";
    /** Optional: The maximum height/width for the chart container. Defaults to max-h-[250px]. */
    maxHeightClass?: string;
}

// --- Component Implementation ---

/**
 * A generic, reusable Radar Chart component.
 * @param {GenericRadarChartProps} props - The data and configuration for the chart.
 */
function GenericRadarChart({
    data,
    angleKey,
    radarLines,
    gridType = "circle",
    maxHeightClass = "max-h-[350px]",
}: GenericRadarChartProps) {

    // 1. Create a dynamic ChartConfig object from the radarLines prop
    // This maps the dataKey to the required ChartConfig format (label, color)
    const chartConfig: ChartConfig = radarLines.reduce((acc, line) => {
        acc[line.dataKey] = {
            label: line.label,
            color: line.color,
        };
        return acc;
    }, {} as ChartConfig);

    // Check if there's any data or configuration before rendering
    if (!data || data.length === 0 || radarLines.length === 0) {
        return <div className="text-center p-4 text-sm text-muted-foreground">No chart data available.</div>;
    }

    return (
        <ChartContainer
            config={chartConfig}
            className={`aspect-square w-full h-full ${maxHeightClass}`}
        >
            <RadarChart data={data}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />} // Hiding the label is common in radar charts
                />

                {/* PolarGrid: Use configured gridType and optionally disable radialLines */}
                <PolarGrid
                    gridType={gridType}
                // Set radialLines to false to get a clean circle/polygon grid, as in your original example
                />

                {/* PolarAngleAxis: Uses the dynamic angleKey */}
                <PolarAngleAxis dataKey={angleKey} />

                {/* Dynamic Radar Lines: Map over the radarLines prop to render multiple radars */}
                {radarLines.map((line) => (
                    <Radar
                        key={line.dataKey}
                        dataKey={line.dataKey}
                        name={line.label} // Used by the tooltip/legend
                        stroke={line.color}
                        fill={line.color}
                        fillOpacity={line.fillOpacity ?? 0.6} // Use specified opacity or default
                        strokeWidth={2}
                        dot={{
                            r: 4,
                            fillOpacity: 1,
                            // Ensure the dot color matches the line color
                            fill: line.color,
                            stroke: "var(--background)", // Optional: gives a nice halo effect
                            strokeWidth: 2,
                        }}
                    />
                ))}
            </RadarChart>
        </ChartContainer>
    )
}

export { GenericRadarChart, type GenericRadarChartProps, type ChartDataItem, type RadarLineConfig }
