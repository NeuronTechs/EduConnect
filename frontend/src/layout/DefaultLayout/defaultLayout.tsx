import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
interface LayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Sidebar isOpen={true} />
      <div
        className={`container h-full  w-full xl:ml-[250px] ml-0 transition-all delay-200`}
      >
        {/* <Header />
        <main className="xl:w-full w-screen">{children}</main>
        <Footer /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
