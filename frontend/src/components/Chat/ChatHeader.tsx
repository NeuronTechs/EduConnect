import assets from "@/assets";
import { Camera, DotsThreeOutlineVertical, Phone } from "@phosphor-icons/react";
import React from "react";

const ChatHeader = (): React.ReactElement => {
  return (
    <div className="bg-white rounded-md h-[70px] flex justify-between items-center px-4 py-2.5">
      <div className=" flex gap-2">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img src={assets.images.avatar1} alt="" />
        </div>
        <div className="space-y-2">
          <h5 className="text-base font-semibold">Nguyen van tu</h5>
          <p className="text-xs font-normal text-gray-400">Trực tuyến</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-100 text-blue-600 cursor-pointer">
          <Phone size={25} />
        </div>
        <div className="p-2 rounded-md bg-green-100 text-green-600 cursor-pointer">
          <Camera size={25} />
        </div>
        <div className="p-2 rounded-md bg-gray-100 text-gray-600 cursor-pointer">
          <DotsThreeOutlineVertical size={25} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
