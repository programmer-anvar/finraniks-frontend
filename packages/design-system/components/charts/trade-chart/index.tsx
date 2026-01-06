'use client';

import useTradingViewChartScript from '@finranks/design-system/hooks/useTradingViewChartScript';
import React, { useEffect, useRef } from 'react';

// --- Best Practice: Define configuration object for the widget ---
// This improves readability, maintainability, and type safety if using a dedicated type.
const CHART_CONTAINER_ID = 'desktop-tradingview-chart';
const DEFAULT_SYMBOL = 'AMD';
const WIDGET_HEIGHT = 800;

/**
 * Creates the configuration object for the TradingView widget.
 * @param {string} symbol - The financial symbol to display.
 * @returns {object} The configuration object for new window.TradingView.widget.
 */

interface TradeChartProps {
    slug: string | null | undefined; // Symbol/slug to load, allow null/undefined for default
    className?: string
    height?: number
}

/**
 * DesktopChartPage component displays a financial chart using the TradingView widget.
 * It handles the dynamic loading of the external TradingView script and widget initialization.
 * @param {TradeChartProps} props - Component props.
 * @returns {React.ReactElement} The rendered chart container.
 */
const TradeChart: React.FC<TradeChartProps> = ({ slug, height = 800 }) => {

    const getDesktopConfig = (symbol: string) => ({
        width: '100%',
        height: height,
        symbol: symbol, // Dynamic symbol from props
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#140b2e',
        backgroundColor: '#140b2e',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: CHART_CONTAINER_ID, // Use the constant ID
        hide_side_toolbar: false,
        hide_top_toolbar: false,
        save_image: true,
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        support_host: 'https://www.tradingview.com'
    });

    const getMobileConfig = (symbol: string) => ({
        width: '100%',
        height: 420,
        symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#140b2e',
        backgroundColor: '#140b2e',

        // 👇 Mobile UX improvements
        hide_side_toolbar: true,
        hide_top_toolbar: true,
        allow_symbol_change: false,
        save_image: false,

        // 👇 Use popup instead (TradingView mobile style)
        show_popup_button: true,
        popup_width: '100%',
        popup_height: '100%',

        container_id: CHART_CONTAINER_ID,
    });

    const isScriptLoaded = useTradingViewChartScript();

    const widgetInitializedRef = useRef(false);

    const symbol = slug?.trim() || DEFAULT_SYMBOL;

    useEffect(() => {
        if (!isScriptLoaded || !(window as any).TradingView) return;

        const container = document.getElementById(CHART_CONTAINER_ID);
        if (!container) return;

        container.innerHTML = '';

        const isMobile =
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 768px)').matches;

        const config = isMobile
            ? getMobileConfig(symbol)
            : getDesktopConfig(symbol);

        new (window as any).TradingView.widget(config);
        widgetInitializedRef.current = true;

    }, [isScriptLoaded, symbol]);


    return (
        <div   >
            <div className="main-box desktop-chart-container">
                <div className="main-box__top">
                    {/* Display the current symbol in the title */}
                    <h2 className="text-white text-[20px] font-bold mb-5">Chart: {symbol}</h2>
                </div>
                <div className="">
                    {/* Show a loading indicator while the script is not yet available */}
                    {!isScriptLoaded && (
                        <div style={{ height: height, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#140b2e', color: '#fff' }}>
                            Loading Chart...
                        </div>
                    )}
                    <div
                        id={CHART_CONTAINER_ID}
                        // Hide the container until the script is loaded to prevent a flash of unstyled content
                        style={{ display: isScriptLoaded ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export { TradeChart, type TradeChartProps }