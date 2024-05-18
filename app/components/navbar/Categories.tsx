'use client'
import { TbBeach } from "react-icons/tb";
import Container from "../Container";
import { MdOutlineVilla } from "react-icons/md";
import { GiWindmill } from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: 'TbBeach',
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: 'GiWindmill',
        description: 'This property is close to the beach!'
    },
    {
        label: 'Modern',
        icon: 'MdOutlineVilla',
        description: 'This property is close to the beach!'
    },
    {
        label: 'Countryside',
        icon: 'TbBeach',
        description: 'This property is close to the beach!'
    },
    {
        label: 'Pools',
        icon: 'TbBeach',
        description: 'This property is close to the beach!'
    },
];

const Categories = () => {
    const params = useSearchParams();
    const selectedCategory = params.get('category');

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        {...item}
                        icon={item.icon}
                        selected={item.label === selectedCategory}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
