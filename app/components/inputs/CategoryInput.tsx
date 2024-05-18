'use client';

import { IconType } from "react-icons";
import { GiWindmill } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach } from "react-icons/tb";

interface CategoryInputProps{
    onClick: (value: string) => void;
    label: string;
    selected?: boolean;
    icon: string;
}
const iconMap: { [key: string]: IconType } = {
    TbBeach: TbBeach,
    MdOutlineVilla: MdOutlineVilla,
    GiWindmill: GiWindmill,
    IoMdClose: IoMdClose,
};


const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    label,
    selected,
    icon
}) => {
    const Icon = iconMap[icon];
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                flex
                flex-col
                gap-2
                p-3 
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <div    
                className="
                    w-10
                    h-10
                    bg-neutral-100
                    rounded-full
                    flex
                    items-center
                    justify-center
                "
            >
                <Icon
                    size={30}
                    color={selected ? 'black' : 'gray'}
                />
            </div>
            <div
                className="
                    font-semibold
                    text-lg
                    text-black
                "
            >
                {label}
            </div>
        </div>
    );
}
export default CategoryInput;