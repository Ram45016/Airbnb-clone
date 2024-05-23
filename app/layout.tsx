import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProviders from "./providers/ToasterProviders";
import ClientOnly from "./components/ClientOnly";
import SearchModal from "./components/modal/SearchModal";
import img from"../public/images/logo.png"
import UploadModal from "./components/modal/UploadModal";

export const metadata = {
  
  title: "Airbnb",
  description: "Airbnb clone",
  image:"/images/logo.png",
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
       <link rel="icon" href="/images/logo.png" type="image/x-icon" sizes="16x16" />
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser}/>
          <ToasterProviders/>
          <SearchModal/>
          <UploadModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
        </ClientOnly>
        <div className="pb-36 pt-48">
         {children}
        </div>
        </body>
    </html>
  );
}
