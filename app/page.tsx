import Image from "next/image";
import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import Search from "./components/navbar/Search";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

interface HomeParams{
  searchParams:IListingsParams
}
const Home=async({searchParams}:HomeParams)=>{
  const isEmpty = true;
  const listings= await getListings(searchParams);
  const currentUser=await getCurrentUser();

  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    ) 
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          "
        >
          {listings.map((listing)=>{
            return(
                  <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                  />
            )}
          )}
        </div>
        </Container>
      </ClientOnly>
  );
}

export default Home;