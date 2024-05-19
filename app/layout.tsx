import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import ListingComponent from "./components/listings/ListingComponent";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};
const hotelListings = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'Hotel One',
    description: 'A nice place to stay.',
    price: '$100/night',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Hotel Two',
    description: 'Another great place to stay.',
    price: '$150/night',
  },
  // Add more listings as needed
];

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={font.className}>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar />
        {children}
        <ListingComponent listings={hotelListings} category="Hotels"/>
      </body>
    </html>
  );
}
