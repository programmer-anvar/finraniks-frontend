import { Card } from "@finranks/design-system/components/card";
import { TradeChart } from "@finranks/design-system/components/charts";
import React from "react";

const ChartPage = async ({ params }: { params: any }) => {
    const { slug } = await params;

    return (
        <div className="container">
            <Card className="p-4 rounded-xl">
                <TradeChart slug={slug} />
            </Card>
        </div>
    )
}

export default ChartPage