'use client'

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useImageUploadModal from "@/app/hooks/useImageUploadModal";
import useVerificationModal from "@/app/hooks/useVerificationModal";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const uploadModal=useImageUploadModal();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const verification=useVerificationModal();
    const rentModal = useRentModal();
    const router=useRouter();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen(); 
        }
        if(!currentUser?.emailVerified){
            return verification.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);
    
    const handleMenuItemClick = (callback: () => void) => {
        setIsOpen(false);
        callback();
    };
    
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem 
                                    onClick={() =>router.push("/trips") } 
                                    label="My Trips"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/favorites")} 
                                    label="My Favorites"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/reservations")} 
                                    label="My Reservations"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/properties")} 
                                    label="My Properties"
                                />
                                
                                <MenuItem 
                                    onClick={() =>{rentModal.onOpen()}} 
                                    label="Airbnb my home"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/profile")} 
                                    label="Profile"
                                />
                                <MenuItem 
                                    onClick={() => handleMenuItemClick(signOut)} 
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem 
                                    onClick={() => handleMenuItemClick(loginModal.onOpen)} 
                                    label="Login"
                                />
                                <MenuItem 
                                    onClick={() => handleMenuItemClick(registerModal.onOpen)} 
                                    label="SignUp"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
