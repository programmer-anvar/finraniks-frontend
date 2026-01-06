export interface EconomicMoatItem {
    scale: 'Wide' | 'Medium' | 'None';
    score: string;
    scoreColor: string;
}

export interface EconomicMoatAverage {
    score: string;
    scoreColor: string;
}

export interface EconomicMoatData {
    marketShare: EconomicMoatItem;
    intangibleAsset: EconomicMoatItem;
    switchingCost: EconomicMoatItem;
    networkEffect: EconomicMoatItem;
    economyScale: EconomicMoatItem;
    weightedAverage: EconomicMoatAverage;
}

export interface EconomicMoat {
    data: EconomicMoatData;
}