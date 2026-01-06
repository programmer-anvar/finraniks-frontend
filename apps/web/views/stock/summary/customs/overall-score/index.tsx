import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography';
import { Progress } from '@finranks/design-system/components/progress';
import { memo } from 'react';

interface MetricProps {
    label: string
    score: number
    percentage: number
    color: string
}

function Metric({ label, score, percentage, color }: MetricProps) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-white text-sm w-32">{label}</span>
            <div style={{ borderColor: color }} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border`}>
                <span className="text-white font-semibold text-[13px]">{score}</span>
            </div>
            <div className="flex-1 relative">
                <Progress value={percentage} className="h-3 bg-purple-950/50" indicatorColor={color} />
            </div>
        </div>
    )
}

const OverAllScore = memo(({ data }: any) => {
    const { average, ...others } = data;
    const mainValue = average.weightedAverageScore;
    const mainColor = average.weightedAverageScoreColor;
    const mainPercent = mainValue * 100 / 10;
    return (
        <Card className='space-y-4 rounded-[20px] p-4 md:p-6'>
            <Typography variant="h4">Overall Score</Typography>
            <div className="mb-8">
                <div className="flex items-end justify-between mb-3">
                    <span className="text-white text-[20px] font-bold">{mainValue + " / 10"}</span>
                    <span className="text-gray-400 text-sm">{mainPercent.toFixed(0)}%</span>
                </div>
                <Progress value={mainPercent} className="h-3 bg-purple-950/50" indicatorColor={mainColor} />
            </div>
            <div className="space-y-2 ">
                {
                    Object.keys(others).map(o => {
                        const item = data[o];
                        const value = item.weightedAverageScore;
                        const color = item.weightedAverageScoreColor;
                        const percent = value * 100 / 10;
                        const label = o
                            .replace(/([A-Z])/g, ' $1')
                            .trim()
                            .replace(/\b\w/g, c => c.toUpperCase())

                        return (
                            <Metric key={label} label={label} score={value} percentage={percent} color={color} />
                        )
                    })
                }
            </div>
        </Card>
    )
})

export default OverAllScore