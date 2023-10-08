import assets from "@/assets";
import { CheckCircle } from "@phosphor-icons/react";
import React from "react";
import FileMessage from "./MediaChat/FileMessage";
// import MediaMessage from "./MediaMessage";

interface IProps {}
const ItemChat = (props: IProps): React.ReactElement => {
  return (
    <div className="w-[80%] flex items-start justify-start gap-2.5 p-2.5">
      <div className="rounded-md w-[40px] h-[40px] overflow-hidden">
        <img src={assets.images.avatar1} alt="" className="w-full h-full" />
      </div>
      <div className="flex-1 flex flex-col gap-2.5 justify-start items-start">
        {/* header account */}
        <div className="flex gap-2 items-center justify-start">
          <h5 className="text-base font-semibold leading-3">Nguyễn văn tú</h5>
          <p className="text=base font-normal text-gray-500"></p>
          <div className="flex items-center justify-center">
            <CheckCircle size={15} className="text-blue-500" />
          </div>
          <div className="flex -space-x-2">
            <img
              className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
              src={assets.images.avatar1}
              alt=""
            />
            <img
              className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
              src={assets.images.avatar1}
              alt=""
            />
            <img
              className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
              src={assets.images.avatar1}
              alt=""
            />
            <div className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 cursor-pointer">
              +3
            </div>
          </div>
        </div>
        {/* content */}
        <p className="flex text-base font-normal text-gray-500">
          Wo aro currency developing our sates Iir and wob Otos and tvo
          Interested in translating these into five languages from Erel.srw
        </p>
        {/* <AudioSoundMessage /> */}

        {/* <MediaMessage /> */}
        <FileMessage />
      </div>
    </div>
  );
};

export default ItemChat;
