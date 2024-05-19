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
        <ClientOnly>
          <RentModal/>
          <ToasterProviders/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser}/>
         {children}
        </ClientOnly>
        </body>
    </html>
  );
}
