import React from "react";
import assets from "../assets";
import { House, X } from "@phosphor-icons/react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Ref = HTMLDivElement;
const Sidebar = React.forwardRef<Ref, Props>(
  (props, ref): React.ReactElement => {
    return (
      <div
        className={`w-[250px] h-screen shadow-sm z-50 bg-white fixed top-0 left-0 xl:translate-x-0 ${
          props.isOpen ? "-translate-x-0" : "-translate-x-[250px]"
        } transition-all delay-200 flex flex-col px-2 py-4`}
        ref={ref}
      >
        {/* logo */}
        <div className="relative w-full flex items-center justify-center mb-10">
          <img src={assets.images.logoMain} alt="" className="h-[50px]" />
          <div className="absolute left-3">
            <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200">
              <X
                size={25}
                className="text-gray-500"
                onClick={() => props.setIsOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>
        {/* item  */}
        <div className="w-full flex flex-col items-center justify-start">
          <div className="w-full px-3 py-2 bg-blue-400 text-white rounded-lg flex items-center justify-start space-x-4">
            <House size={32} />
            <p className="text-base font-medium font-sans flex items-center justify-center">
              Trang Chủ
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default Sidebar;
