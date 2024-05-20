'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { GiCactus, GiWindmill } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineVilla, MdPool } from "react-icons/md";
import { TbBeach, TbMountain } from "react-icons/tb";
import { FaSkiing, FaLandmark, FaCity, FaCampground } from "react-icons/fa";

interface CategoryBoxProps {
    icon: string;
    label: string;
    selected: boolean;
}

const iconMap: { [key: string]: IconType } = {
    TbBeach: TbBeach,
    GiWindmill: GiWindmill,
    MdOutlineVilla: MdOutlineVilla,
    TbMountain: TbMountain,
    MdPool: MdPool,
    FaSkiing: FaSkiing,
    FaLandmark: FaLandmark,
    FaCity: FaCity,
    FaCampground: FaCampground,
    GiCactus: GiCactus
};

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon,
    label,
    selected
}) => {
    const Icon = iconMap[icon];
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: selected ? undefined : label
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, selected, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
}

export default CategoryBox;
