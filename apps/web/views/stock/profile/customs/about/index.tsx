import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

const About = ({ description }: { description: string }) => {
    return (
        <Card className='p-6 rounded-xl space-y-5'>
            <Typography variant="h2" className="text-[20px]!" weight="semibold">About the company</Typography>
            <Typography variant="body" className="text-[14px]!" weight="semibold">
                {description}
            </Typography>
        </Card>
    )
}

export default About