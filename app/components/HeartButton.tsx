import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavoriteId, toggleFavorite } = useFavorite({ listingId, currentUser });

    return (
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <AiOutlineHeart
                size={24}
                className="
                    fill-white
                    drop-shadow-md
                "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavoriteId
                        ? "fill-rose-500 absolute inset-0"
                        : "fill-neutral-500/70 absolute inset-0"
                }
            />
        </div>
    );
}

export default HeartButton;
