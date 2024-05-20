'use client';

import { IconType } from "react-icons";
import { FaSkiing, FaLandmark, FaCity, FaCampground } from "react-icons/fa";
import { GiCactus, GiWindmill } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineVilla, MdPool } from "react-icons/md";
import { TbBeach, TbMountain } from "react-icons/tb";

interface ListingCategoryProps {
    icon: string;
    label: string;
    description: string;
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

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon,
    label,
    description
}) => {
    const Icon = iconMap[icon];
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <Icon
                    size={40}
                    className="text-neutral-600"
                />
                <div className="flex flex-col">
                    <div className="font-semibold text-lg">{label}</div>
                    <div className="font-light text-neutral-500">{description}</div>
                </div>
            </div>
        </div>
    );
}

export default ListingCategory;