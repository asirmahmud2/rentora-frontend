import Footer from "@/Component/HomePage/Footer";
import AppNavbar from "@/Component/HomePage/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AppNavbar></AppNavbar>
      <Footer></Footer>
    </div>
  );
}
