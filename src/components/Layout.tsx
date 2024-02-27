import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="bg-[url('/src/assets/light-patten.svg')] bg-center flex-1 mt-16">
        <main className="container px-4 mx-auto overflow-hidden">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
