import React, { useRef, useState } from "react";
// import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
interface LayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    // Your custom logic here
    setIsOpen(false);
  };

  // const handleClickInside = () => {
  //   // Your custom logic here
  //   console.log("clicked inside");
  // };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Sidebar ref={ref} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`h-full w-full xl:pl-[180px] pl-0 transition-all delay-200`}
      >
        <Header setIsOpen={setIsOpen} />
        <main className="w-full h-[calc(100%-80px)] bg-[#F1F5F9] overflow-auto pb-4">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
