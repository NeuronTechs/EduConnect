import assets from "@/assets";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

const ListChat = () => {
  return (
    <div className="flex flex-col items-center justify-start bg-white rounded-md h-full overflow-hidden pb-2">
      <div className="h-auto">
        <div className="flex w-full items-center justify-center py-1 px-4">
          <h5 className="text-xl font-bold text-black">Tin Nhắn</h5>
        </div>
        <div className="w-full px-2 py-3">
          <div className="h-[50px] flex items-center bg-gray-200 rounded-md px-4 py-2 justify-between gap-2 ">
            <input
              type="text"
              className="text-xs font-medium placeholder:text-gray-400 w-full h-full px-2 bg-transparent focus:ring-gray-200 focus:border-gray-200 border-none "
              placeholder="Tìm kiếm tin nhắn"
            />
            <MagnifyingGlass size={25} className="text-blue-400" />
          </div>
        </div>
        <div className="w-full flex items-center p-2 gap-2">
          <div className="p-2 rounded-md text-white bg-blue-400 hover:bg-blue-500 text-xs font-bold whitespace-nowrap">
            Giáo Viên
          </div>
          <div className="p-2 rounded-md text-blue-400 border border-blue-400 hover:bg-gray-200 text-xs font-bold whitespace-nowrap">
            Lớp Học
          </div>
          <div className="p-2 rounded-md text-blue-400 border border-blue-400 hover:bg-gray-200 text-xs font-bold whitespace-nowrap">
            Nhóm Học
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col px-2 overflow-auto gap-2  ">
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
        <ItemConventionChat />
      </div>
    </div>
  );
};

export default ListChat;

const ItemConventionChat = (): React.ReactElement => {
  return (
    <div className="bg-gray-100 flex items-center justify-between p-2.5 gap-2 rounded-md hover:bg-gray-200 ">
      <div className="flex items-center space-x-3 w-full">
        <div className="h-[40px] w-[40px]">
          <img src={assets.images.avatar1} alt="" />
        </div>
        <div className="flex flex-col justify-start gap-2">
          <h5 className="text-xs font-medium text-black overflow-hidden text-ellipsis">
            Nguyen van tu
          </h5>
          <p className="text-xs font-medium text-gray-500 overflow-hidden text-ellipsis">
            How many thing?
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end justify-end">
        <p className="text-xs font-normal text-gray-500">10:30</p>
        <div className="rounded-full p-1 bg-blue-500 text-white flex items-center justify-center h-4  w-auto text-xs font-normal">
          5
        </div>
      </div>
    </div>
  );
};
