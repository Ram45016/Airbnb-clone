import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertyClient from "./PropertyClient";
import getListingById from "../actions/getListingById";
import getListings from "../actions/getListings";
const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) { 
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }
    const listings=await getListings({
        userId:currentUser.id
    });
    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState
                    imageUrl="/images/Properties.png"
                    title="No Properties found"
                    subtitle="Looks like you haven't reserved any Properties."
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <PropertyClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>

    );
}

export default PropertiesPage;