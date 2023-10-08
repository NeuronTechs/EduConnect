import assets from "@/assets";
import {
  Camera,
  DotsThreeOutlineVertical,
  PaperPlaneTilt,
  Phone,
  Smiley,
} from "@phosphor-icons/react";
import React from "react";
import ItemChat from "./ItemChat";

const ChatContent = (): React.ReactElement => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* header */}
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
          <div className="p-2 rounded-md bg-blue-100 text-blue-600">
            <Phone size={25} />
          </div>
          <div className="p-2 rounded-md bg-green-100 text-green-600">
            <Camera size={25} />
          </div>
          <div className="p-2 rounded-md bg-gray-100 text-gray-600">
            <DotsThreeOutlineVertical size={25} />
          </div>
        </div>
      </div>
      {/* content */}
      <div className="bg-white rounded-md flex-1 overflow-auto p-2.5">
        <ChatContentMain />
      </div>
      {/* input */}
      <div className="bg-white rounded-md h-[60px] flex items-center p-3 space-x-2 ">
        <div className="p-1 rounded-md bg-gray-100 flex items-center justify-center">
          <DotsThreeOutlineVertical size={25} />
        </div>
        <div className="w-full px-4 py-2 bg-blue-50 flex items-center justify-start rounded-md space-x-2">
          <div className="">
            <Smiley size={25} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Nhập Tin Nhắn..."
            className="text-xs font-normal placeholder:text-gray-500 w-full bg-transparent focus:ring-transparent focus:border-transparent outline-none border-none"
          />
        </div>
        <div className="p-2 flex items-center justify-center text-blue-500">
          <PaperPlaneTilt size={25} weight="bold" />
        </div>
      </div>
    </div>
  );
};

export default ChatContent;

const ChatContentMain = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-2.5">
      <ItemChat />
      <ItemChat />
      <ItemChat />
      <DividerTime />
      <ItemChat />
    </div>
  );
};

const DividerTime = () => {
  return (
    <div className="inline-flex items-center justify-center w-full relative px-3">
      <hr className="w-full h-px my-5 bg-gray-300 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
        or
      </span>
    </div>
  );
};
