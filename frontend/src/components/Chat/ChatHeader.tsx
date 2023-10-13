import assets from "@/assets";
import { IConventionChat } from "@/types/type";
import { Camera, DotsThreeOutlineVertical, Phone } from "@phosphor-icons/react";
import React from "react";
interface IProps {
  data: IConventionChat;
}
const ChatHeader = (props: IProps): React.ReactElement => {
  return (
    <div className="bg-white rounded-md h-[70px] flex justify-between items-center px-4 py-2.5">
      <div className=" flex gap-2">
        <div className="relative">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden ">
            <img
              src={
                props.data.avatar ? props.data.avatar : assets.images.avatar1
              }
              alt=""
            />
          </div>
          <span className="bottom-0 left-9 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <div className="space-y-2">
          <h5 className="text-base font-semibold">{props.data.name}</h5>
          <p className="text-xs font-normal text-gray-400">
            {props.data.isOnline ? "online" : "offline"}
          </p>
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
