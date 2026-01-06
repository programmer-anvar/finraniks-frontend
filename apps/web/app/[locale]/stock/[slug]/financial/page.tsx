import FinancialPage from "@/views/stock/financial";
import { type SearchParams } from "nuqs/server";
export default function Page({ params, searchParams }: { params: any, searchParams: Promise<SearchParams> }) {
    return <FinancialPage params={params} searchParams={searchParams} />;
}