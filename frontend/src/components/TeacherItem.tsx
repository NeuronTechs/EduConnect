import React from "react";
import assets from "../assets";
import {
  DotsThreeOutlineVertical,
  EnvelopeSimpleOpen,
} from "@phosphor-icons/react";

const TeacherItem = () => {
  return (
    <div className="bg-white rounded-xl p-2.5 space-y-5 min-w-[200px] gap-2 py-2">
      <div className="flex gap-4 justify-center">
        <div className="w-50px">
          <img
            src={assets.images.avatar1}
            alt=""
            className="rounded-full object-fill h-[50px] w-[50px]"
          />
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <h6 className="text-sm font-semibold">Jionson whet</h6>
          <p className="text-sm font-light">Ui/UX thiết kế</p>
          <p className="text-sm font-light">10 khoá học</p>
          <p className="text-sm font-light">100 người học</p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="text-sm font-normal px-6 py-2.5 rounded-lg bg-blue-300 text-white">
          Xem
        </div>
        <div className=" flex items-center justify-center rounded-md bg-gray-300/50 p-2">
          <EnvelopeSimpleOpen size={24} />
        </div>
        <div className=" flex items-center justify-center rounded-md bg-gray-300/50 p-2">
          <DotsThreeOutlineVertical size={24} />
        </div>
      </div>
    </div>
  );
};

export default TeacherItem;
