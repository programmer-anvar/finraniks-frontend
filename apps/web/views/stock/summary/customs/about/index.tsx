"use client"
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { get, truncate } from 'lodash';
import Link from 'next/link';
import { useParams } from 'next/navigation';



const About = ({ info }: any) => {
    const { slug } = useParams();
    const description = get(info, 'description') ? info.description : "";
    const ceo = get(info, 'ceo') ? info.ceo : "";
    const country = get(info, 'country') ? info.country : "";
    const ipoDate = get(info, 'ipoDate') ? info.ipoDate : "";
    const employees = get(info, 'employees') ? Number(info.employees) : 0;
    const fiscalYearEnd = get(info, 'fiscalYearEnd') ? info.fiscalYearEnd : "";
    const website = get(info, 'website') ? info.website : "";

    const COMPANY_FACTS = [
        { label: "CEO", value: ceo ?? "N/A" },
        { label: "Country", value: country ?? "N/A" },
        { label: "IPO Date", value: ipoDate ?? "N/A" },
        { label: "Employees", value: employees ?? "N/A" },
        { label: "Fiscal Year End", value: fiscalYearEnd ?? "N/A" },
        {
            label: "Website",
            value: (
                website ? <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline-offset-4 hover:underline hover:text-purple-600 transition-colors duration-300"
                >
                    {truncate(website, { length: 30, omission: "..." })}
                </Link > : "N/A"
            ),
        },
    ];

    return (
        <Card className='space-y-4 flex flex-col rounded-[20px] p-4 md:p-6'>
            <Typography variant="h4" as="h2">About the company</Typography>

            <div>
                <Typography variant='body' className='text-[14px]' as="div">      {get(info, 'description', '').slice(0, 430)}
                    {description.length > 430 && (
                        <>
                            ... <Link href={`/en/stock/${slug}/profile`} className="text-purple-600">read more</Link>
                        </>
                    )}</Typography>
            </div>

            <dl className="space-y-2 mt-auto">
                {COMPANY_FACTS.map(({ label, value }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between border-b border-[#ffffff33]"
                    >
                        <dt className="text-white text-[14px]">{label}</dt>
                        <dd className="font-semibold text-white text-right text-[14px]">{value}</dd>
                    </div>
                ))}
            </dl>
        </Card>
    )
}

export default About