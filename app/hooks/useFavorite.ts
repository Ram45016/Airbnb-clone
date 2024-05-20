import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IuseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite=({
    listingId,
    currentUser
}: IuseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavoriteId = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);
    
    const toggleFavorite= useCallback(async(
        e:React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;
            if(hasFavoriteId){
                request = () => axios.delete(`/api/favorites/${listingId}`);
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Success");
        }catch(error){
            toast.error("Something went wrong");
        }
    },[currentUser, hasFavoriteId, listingId, loginModal,router]);
    return{
        hasFavoriteId,
        toggleFavorite
    }
};
export default useFavorite;