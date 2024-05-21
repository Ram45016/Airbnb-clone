import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteCLient from "./FavoriteClient";

const FavoritePage = async () => {
    const favoritelistings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }
    if (favoritelistings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings"
                    imageUrl="/images/fav.png"
                />
            </ClientOnly>
        );
    }
    return(
        <ClientOnly>
            <FavoriteCLient
                listings={favoritelistings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default FavoritePage;