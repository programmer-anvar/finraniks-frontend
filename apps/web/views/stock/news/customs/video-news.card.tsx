import Link from "next/link";
import { formatDate } from "@finranks/design-system/lib/utils";

const VideoNewsCard = ({ item }: any) => {
    return (
        <Link href={item.news_url} className="block mb-5 hover:via-violet-700">
            <div className="relative pb-[54.6%] mb-4">
                <img className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" src={item.image_url} alt="" />
            </div>

            <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-[#909da2]">{formatDate(item.date)}</div>
                {item.sentiment && (
                    <div className="text-[#49aa19] bg-[#162312] border py-0 rounded px-1.5 text-sm">{item.sentiment}</div>
                )}
            </div>

            <div className="font-semibold text-white transition-all overflow-hidden ">
                {item.title}
            </div>
        </Link>
    );
};

export default VideoNewsCard;
