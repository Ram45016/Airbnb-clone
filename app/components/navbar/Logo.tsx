'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    return (
        <Image 
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="100"
            width="100"
            src="/images/applogo.png"
            onClick={handleClick} // Added onClick event handler
        />
    );
}

export default Logo;
