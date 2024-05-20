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
        description: 'Experience the charm of windmills nearby!'
    },
    {
        label: 'Modern',
        icon: 'MdOutlineVilla',
        description: 'Enjoy a stay in a modern villa!'
    },
    {
        label: 'Countryside',
        icon: 'TbMountain',
        description: 'Escape to the peaceful countryside!'
    },
    {
        label: 'Pools',
        icon: 'MdPool',
        description: 'Relax with a poolside view!'
    },
    {
        label: 'Skiing',
        icon: 'FaSkiing',
        description: 'Perfect spot for skiing enthusiasts!'
    },
    {
        label: 'Historical',
        icon: 'FaLandmark',
        description: 'Stay in a property with historical significance!'
    },
    {
        label: 'City',
        icon: 'FaCity',
        description: 'Explore the vibrant city life!'
    },
    {
        label: 'Camping',
        icon: 'FaCampground',
        description: 'Enjoy a unique camping experience!'
    },
    {
        label: 'Desert',
        icon: 'GiCactus',
        description: 'Experience the beauty of the desert!'
    }
];

const Categories = () => {
    const params = useSearchParams();
    if(!params){
        return null;
    }
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
