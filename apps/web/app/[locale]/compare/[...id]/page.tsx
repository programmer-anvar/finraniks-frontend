import ComparePage from "@/views/compare";

export default async function Page({ params }: { params: Promise<{ id: string; }>; }) {
    return <ComparePage params={params} />;
}