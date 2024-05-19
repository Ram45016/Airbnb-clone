import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import ListingComponent from "./components/listings/ListingComponent";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProviders from "./providers/ToasterProviders";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};
const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const currentUser= await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <RentModal/>
        <ToasterProviders/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        {children}
        </body>
    </html>
  );
}
