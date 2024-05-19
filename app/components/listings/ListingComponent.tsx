import React from 'react';

interface Listing {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

interface ListingComponentProps {
  listings: Listing[];
  category: string;
}

const ListingComponent: React.FC<ListingComponentProps> = ({ listings, category }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded-lg shadow-md">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover rounded-md" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <p className="text-gray-600">{listing.description}</p>
              <p className="mt-2 font-bold">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingComponent;
