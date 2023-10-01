import { Book, ShieldCheck, UsersFour } from "@phosphor-icons/react";
import React from "react";
import assets from "../../assets";
const Card = () => {
  return (
    <div className="rounded-2xl bg-white p-2 flex flex-col gap-4 shadow-sm w-[180px]  ">
      <div className="w-full">
        <img
          src={assets.images.bgCourse}
          alt=""
          className="w-full h-[100px] object-fill rounded-2xl"
        />
      </div>
      <div className="card-content px-1 space-y-2 mb-2">
        {/* content */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h5 className="text-sm font-semibold text-black">HTML leaning</h5>
            <p className="text-xs font-normal text-gray-600">Jionson whet</p>
          </div>
          <div className="rounded-full h-[35px] w-[35px]">
            <img src={assets.images.avatar1} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-gray-900 font-medium">
        <div className="flex justify-center items-center">
          <Book size={20} /> 1
        </div>
        <div className="flex justify-center items-center">
          <ShieldCheck size={20} /> 2
        </div>
        <div className="flex justify-center items-center">
          <UsersFour size={20} /> 3
        </div>
      </div>
      <div className="w-full bg-gray-300 rounded-lg h-3">
        <div
          className="bg-gray-800 p-0.5 text-center text-[10px] font-light leading-none text-primary-100 rounded-lg"
          style={{ width: "40%" }}
        >
          25%
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <h6>Complete 60%</h6>
        <h6>Days: 15/24</h6>
      </div>
    </div>
  );
};

export default Card;
