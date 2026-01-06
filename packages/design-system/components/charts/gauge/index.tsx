import React, { CSSProperties } from 'react';
import ReactGaugeChart from 'react-gauge-chart';

// --- 1. Define the Props Interface ---
/**
 * Interface for all configurable properties of the GenericGaugeChart.
 * This provides type-checking and auto-completion for users of the component.
 */
interface GaugeChartProps {
    // Required Core Prop
    /** The current value the needle points to, between 0 and 1. */
    percent: number;

    // Appearance & Customization Props
    /** Number of color segments (levels) in the arc. */
    nrOfLevels?: number;
    /** An array of hex color strings, one for each level. */
    colors?: string[];
    /** The width of the arc as a percentage of the total radius (0 to 1). */
    arcWidth?: number;
    /** Padding between the color segments (0 to 1). */
    arcPadding?: number;
    /** The corner radius of the arc segments. */
    cornerRadius?: number;

    // Needle & Text Props
    /** The color of the needle. */
    needleColor?: string;
    /** The color of the needle's base circle. */
    needleBaseColor?: string;
    /** If true, the percentage text is hidden. */
    hideText?: boolean;
    /** The color of the displayed percentage text. */
    textColor?: string;

    // Layout & Formatting Props
    /** A function to override how the percentage text is displayed (e.g., adding units). */
    formatTextValue?: (value: string) => string;
    /** Margin around the chart, as a percentage. */
    marginInPercent?: number;
    /** Custom styles for the main wrapper div. */
    style?: CSSProperties;
    /** A unique ID for the SVG element. Essential when rendering multiple charts. */
    id?: string;
}
const calcFairPercent = ({ fairValue, stockPrice }: { fairValue: number, stockPrice: number }) => {
    const diffPercent = (stockPrice - fairValue) / fairValue;
    const percGroup = diffPercent < -0.3 ? 'dark-green' :
        diffPercent >= -0.3 && diffPercent < -0.1 ? "green" :
            diffPercent >= -0.1 && diffPercent <= 0.1 ? "yellow" :
                diffPercent > 0.1 && diffPercent <= 0.3 ? "orange" :
                    diffPercent > 0.3 ? "red" : ''

    let chartPerc = 1;
    switch (percGroup) {
        case 'dark-green':
            chartPerc += (diffPercent + 0.3) * (4 / 7) - 0.6;
            break;
        case 'green':
            chartPerc += (diffPercent + 0.1) * 2 - 0.2;
            break;
        case 'yellow':
            chartPerc += diffPercent * 2;
            break;
        case 'orange':
            chartPerc += (diffPercent - 0.1) * 2 + 0.2;
            break;
        case 'red':
            chartPerc += (diffPercent - 0.3) * (4 / 7) + 0.6;
            break;
    }

    const truePerc = chartPerc / 2;
    return truePerc < 0 ? 0 : truePerc > 1 ? 1 : truePerc;
};

// --- 2. The Component Implementation ---
const GenericGaugeChart: React.FC<GaugeChartProps> = ({
    // Destructure props and provide default values
    percent, // Required, no default needed as it's not optional in the interface (but default added below for safety)
    nrOfLevels = 5,
    colors = ['#9353D359', '#9353D380', '#9353D399', '#9353D3B2', '#9353D3'],
    arcWidth = 0.35,
    arcPadding = 0.01,
    cornerRadius = 10,
    needleColor = '#746FF2',
    needleBaseColor = '#746FF2',
    textColor = '#000',
    hideText = false,
    formatTextValue,
    marginInPercent = 0,
    style = { marginBottom: '10px' },
    id = 'gauge-chart-generic',
}) => {

    // Clamp the percentage value to ensure it's always between 0 and 1
    return (
        <ReactGaugeChart
            id={id}
            marginInPercent={marginInPercent}
            style={style}
            textColor={textColor}
            percent={percent}
            cornerRadius={cornerRadius}
            nrOfLevels={nrOfLevels}
            arcPadding={arcPadding}
            arcWidth={arcWidth}
            needleColor={needleColor}
            needleBaseColor={needleBaseColor}
            hideText={hideText}
            colors={colors}
            formatTextValue={formatTextValue}
        />
    )
}

// Rename the export to better reflect its generic nature
export { GenericGaugeChart, type GaugeChartProps, calcFairPercent };