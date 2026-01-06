import {StrengthWeaknessAnalysis} from "@/types/company/company-analysis/strength-weakness";
import {ScoreAnalysis} from "@/types/company/company-analysis/score";
import {FinancialStrengthAnalysis} from "@/types/company/company-analysis/financial-strength";
import {SummaryAnalysis} from "@/types/company/company-analysis/summary-analysis";
import {ProfitabilityData} from "@/types/company/company-analysis/profitability";
import {EffectivenessAnalysis} from "@/types/company/company-analysis/effectiveness";
import {GrowthAnalysis} from "@/types/company/company-analysis/growth";
import {ForecastAnalysis} from "@/types/company/company-analysis/forecast";
import {EpsComparison} from "@/types/company/company-analysis/eps-comparison";
import {ValuationAnalysis} from "@/types/company/company-analysis/valuation";
import {DcfModel} from "@/types/company/company-analysis/dcf-model";
import {Dividends} from "@/types/company/company-analysis/dividends";
import {EconomicMoat} from "@/types/company/company-analysis/economic-moat";

export interface CompanyAnalysis {
    strength_weakness: StrengthWeaknessAnalysis
    score: ScoreAnalysis
    financialstrength: FinancialStrengthAnalysis
    summary: SummaryAnalysis
    profitability: ProfitabilityData;
    effectiveness: EffectivenessAnalysis;
    growth: GrowthAnalysis;
    forecast: ForecastAnalysis;
    eps_comparison: EpsComparison;
    valuation: ValuationAnalysis;
    dcfmodel: DcfModel;
    dividends: Dividends
    economicmoat: EconomicMoat;
}