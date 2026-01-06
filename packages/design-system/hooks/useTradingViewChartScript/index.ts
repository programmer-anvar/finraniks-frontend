import { useEffect, useState } from 'react';

// Use a global symbol or a well-known window property to store the loading promise
// This prevents multiple components from trying to load the script simultaneously.
const SCRIPT_ID = 'tradingview-widget-loading-script';
const SCRIPT_URL = 'https://s3.tradingview.com/tv.js';

/**
 * A custom hook to safely load the TradingView external script once across the application.
 * @returns {boolean} - True if the script and the global TradingView object are available.
 */
const useTradingViewChartScript = (): boolean => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if ((window as any)?.TradingView) {
            setScriptLoaded(true);
            return;
        }

        let tvScriptLoadingPromise = (window as any).tvScriptLoadingPromise;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.id = SCRIPT_ID;
                script.src = SCRIPT_URL;
                script.type = 'text/javascript';
                script.async = true; // Use async loading

                script.onload = () => {
                    if ((window as any)?.TradingView) {
                        resolve();
                    } else {
                        reject(new Error("TradingView script loaded but object not found."));
                    }
                };

                script.onerror = (e) => {
                    console.error("Failed to load TradingView script:", e);
                    reject(e);
                };

                document.head.appendChild(script);
            }).finally(() => {
                (window as any).tvScriptLoadingPromise = null;
            });

            (window as any).tvScriptLoadingPromise = tvScriptLoadingPromise;
        }

        tvScriptLoadingPromise
            .then(() => setScriptLoaded(true))
            .catch(() => setScriptLoaded(false));

    }, []);

    return scriptLoaded;
};

export default useTradingViewChartScript;