import type { LucideProps } from 'lucide-react';

interface Card1Props{
    title: string,
    total: number
    Icon: React.ComponentType<LucideProps>;
    iconColor?: string;
    iconSize?: number;
}

function Card1 ({ title, total, Icon, iconColor = "black", iconSize = 30 } : Card1Props) {
    return (
        <div className="w-2xs rounded-lg border border-gray-300 p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <p className="text-gray-700">{title}</p>
                <p className="font-medium text-2xl">{total}</p>
            </div>
            <Icon className={iconColor} size={iconSize}/>
        </div>
    );
}

export default Card1;