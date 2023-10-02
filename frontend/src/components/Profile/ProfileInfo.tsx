import React from "react";
import assets from "../../assets";

const ProfileInfo = () => {
  return (
    <div className="w-[35%]  h-[90vh]  bg-white shadow-2xl p-10 m-5 mt-5 rounded-xl ">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-full flex items-center justify-center mb-4">
          <img src={assets.images.task} alt="" className="h-[60px]" />
          <div className="absolute left-3">
            <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200"></div>
          </div>
        </div>
        <h1 className="text-sm">
          <strong> Martin Nel </strong>
        </h1>
        <h2 className="text-center rounded-md bg-orange-900 w-10 text-xs text-white">
          <strong> VIP</strong>
        </h2>
      </div>
      <div className="flex justify-around mt-5 font-semibold">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-gray-400 w-10 h-10 flex justify-center items-center text-base text-blue-600 font-extrabold">
            08
          </div>
          <div className="text-xs">Course in Progress</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-gray-400 w-10 h-10 flex justify-center items-center text-base text-green-600 font-extrabold">
            08
          </div>
          <div className="text-xs">Course Complete</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
