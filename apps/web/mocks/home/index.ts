
export const fakeRadarData = {
    1: {
        "average": { "weightedAverageScore": 5.3, "weightedAverageScoreColor": "#9353D3" },
        "Financial Strength": { "weightedAverageScore": 10, "weightedAverageScoreColor": "#9353D3B2" },
        "Profitability": { "weightedAverageScore": 9.2, "weightedAverageScoreColor": "#9353D399" },
        "Effectiveness": { "weightedAverageScore": 7.8, "weightedAverageScoreColor": "#9353D359" },
        "Growth": { "weightedAverageScore": 5, "weightedAverageScoreColor": "#9353D380" },
        "Forecast": { "weightedAverageScore": 8.5, "weightedAverageScoreColor": "#440373" },
        "Valuation": { "weightedAverageScore": 3.6, "weightedAverageScoreColor": "#440373" },
        "Dividend": { "weightedAverageScore": 9, "weightedAverageScoreColor": "#600e9f" },
        "Economic Moat": { "weightedAverageScore": 5, "weightedAverageScoreColor": '#6023A2' }
    },
    2: {
        "average": { "weightedAverageScore": 2.3, "weightedAverageScoreColor": "#9353D3" },
        "Financial Strength": { "weightedAverageScore": 10, "weightedAverageScoreColor": "#9353D3B2" },
        "Profitability": { "weightedAverageScore": 4.2, "weightedAverageScoreColor": "#9353D399" },
        "Effectiveness": { "weightedAverageScore": 2.8, "weightedAverageScoreColor": "#9353D359" },
        "Growth": { "weightedAverageScore": 9, "weightedAverageScoreColor": "#9353D380" },
        "Forecast": { "weightedAverageScore": 4.5, "weightedAverageScoreColor": "#440373" },
        "Valuation": { "weightedAverageScore": 8.6, "weightedAverageScoreColor": "#440373" },
        "Dividend": { "weightedAverageScore": 1, "weightedAverageScoreColor": "#600e9f" },
        "Economic Moat": { "weightedAverageScore": 5, "weightedAverageScoreColor": '#6023A2' }
    },
    3: {
        "average": { "weightedAverageScore": 8.3, "weightedAverageScoreColor": "#9353D3" },
        "Financial Strength": { "weightedAverageScore": 7, "weightedAverageScoreColor": "#9353D3B2" },
        "Profitability": { "weightedAverageScore": 5, "weightedAverageScoreColor": "#9353D399" },
        "Effectiveness": { "weightedAverageScore": 10, "weightedAverageScoreColor": "#9353D359" },
        "Growth": { "weightedAverageScore": 9, "weightedAverageScoreColor": "#9353D380" },
        "Forecast": { "weightedAverageScore": 3, "weightedAverageScoreColor": "#440373" },
        "Valuation": { "weightedAverageScore": 3, "weightedAverageScoreColor": "#440373" },
        "Dividend": { "weightedAverageScore": 7, "weightedAverageScoreColor": "#600e9f" },
        "Economic Moat": { "weightedAverageScore": 9, "weightedAverageScoreColor": '#6023A2' }
    }
}


export const STOCK_BADGES = [
    {
        id: "1",
        slug: "NVDA",
        label: "NVDA",
    },
    {
        id: "2",
        slug: "TSLA",
        label: "TSLA",
    },
    {
        id: "3",
        slug: "AAPL",
        label: "AAPL",
    },
    {
        id: "4",
        slug: "AMZN",
        label: "AMZN",
    }
];


export const STOCK_MOBILE_BADGES = [
    {
        id: "1",
        slug: "TEAM",
        label: "TEAM",
    },
    {
        id: "2",
        slug: "AMZN",
        label: "AMZN",
    },
    {
        id: "3",
        slug: "TSLA",
        label: "TSLA",
    },
    {
        id: "4",
        slug: "JNJ",
        label: "JNJ",
    },
    {
        id: "5",
        slug: "NVDA",
        label: "NVDA",
    },
    {
        id: "6",
        slug: "AAPL",
        label: "AAPL",
    },
    {
        id: "7",
        slug: "MSFT",
        label: "MSFT",
    },
    {
        id: "8",
        slug: "GOOGL",
        label: "GOOGL",
    },
    {
        id: "9",
        slug: "META",
        label: "META",
    }
]


export const getStockBadges = async () => {

    return STOCK_BADGES;
}