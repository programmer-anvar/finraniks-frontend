"use client";

import React, { memo } from "react";
import { Card } from "@finranks/design-system/components/card";
import { Typography } from "@finranks/design-system/components/typography";
import {
    PolarAngleAxis,
    PolarGrid,
    RadarChart,
    Radar,
    ResponsiveContainer,
} from "recharts";

const formatMetric = (key: string) =>
    key
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

const calcMidPoint = (p1: any, p2: any) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
});

const generatePolygonPoints = ({
    left,
    center,
    right,
    polygonCenter,
}: {
    left: any;
    center: any;
    right: any;
    polygonCenter: any;
}) => {
    const leftP = calcMidPoint(left, center);
    const rightP = calcMidPoint(center, right);
    return `${leftP.x},${leftP.y} ${center.x},${center.y} ${rightP.x},${rightP.y} ${polygonCenter.x},${polygonCenter.y}`;
};

const generatePoints = (points: any[]) => {
    const polygonCenter = { x: points[0]?.cx, y: points[0]?.cy };
    return points.map((center, i) => {
        const left = points[i === 0 ? points.length - 1 : i - 1];
        const right = points[i === points.length - 1 ? 0 : i + 1];
        return generatePolygonPoints({ left, center, right, polygonCenter });
    });
};

const CustomRadar = ({ points }: { points: any[] }) => {
    const allPoints = generatePoints(points);

    return (
        <g>
            {allPoints.map((polygonPoints, i) => {
                const { payload, x, y } = points[i];
                const color = payload?.color ?? "#8884d8";
                const keyForEl = `${x},${y}_${i}`;

                return (
                    <React.Fragment key={keyForEl}>
                        <polygon
                            className="radar-custom-polygon"
                            points={polygonPoints}
                            fill={color}
                            fillOpacity={0.75}
                            stroke={color}
                            strokeWidth={1}
                        />
                        <circle
                            cx={x}
                            cy={y}
                            r={2.25}
                            stroke={color}
                            strokeWidth={1.5}
                            fill="white"
                        />
                    </React.Fragment>
                );
            })}

            {/* Center circle */}
            <circle
                cx={points[0]?.cx}
                cy={points[0]?.cy}
                r={1.7}
                stroke="#746FF2"
                strokeWidth={1}
                fill="white"
            />
        </g>
    );
};

interface OctagonViewProps {
    data: Record<string, any>;
}

const OctagonView: React.FC<OctagonViewProps> = memo(({ data }) => {
    if (!data) return null;

    const { average, ...others } = data;

    const arr = Object.keys(others).map((key) => ({
        metric: formatMetric(key),
        value: others[key]?.weightedAverageScore ?? 0,
        color: others[key]?.weightedAverageScoreColor ?? "#8884d8",
    }));

    return (
        <Card className="space-y-4 rounded-[20px] p-0!">
            <Typography variant="h4" className="px-4 pt-4 md:pt-6 md:px-6!">Octagon View</Typography>

            <div className="w-full h-96 -translate-x-2 -translate-y-4">
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart
                        data={arr}
                        cx="50%"
                        cy="50%"
                        innerRadius="15%"
                        outerRadius="70%"
                        margin={{ top: 0, bottom: 0, right: 60, left: 20 }}
                    >
                        <PolarGrid stroke="#736FF2" gridType="circle" />
                        <PolarAngleAxis
                            dataKey="metric"
                            tick={{ fill: "#EFEFEF", fontSize: 12, dy: 3.5 }}
                        />
                        <Radar
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                            shape={<CustomRadar points={arr} />}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
});

export default OctagonView;
