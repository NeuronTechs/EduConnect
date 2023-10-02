import React from "react";
import assets from "../../assets";
import { Input } from "@material-tailwind/react";
const PublicProfile = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center w-full border-b-2 border-gray-500">
        <h1 className="font-bold text-black"> Public profile </h1>
        Add information about yourself
      </div>
      <div className="relative w-full flex items-center justify-center mb-4 mt-8">
        <img src={assets.images.task} alt="" className="h-[80px]" />
        <img
          src={assets.images.cameraLogo}
          alt=""
          className="h-[20px]  absolute mt-8 ml-12 rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex w-full space-x-7">
          <Input label="Full Name" crossOrigin="anonymous"></Input>
          <Input label="Email Address" crossOrigin="anonymous"></Input>
        </div>
        <Input label="Address" crossOrigin="anonymous"></Input>
        <div className="flex w-full space-x-7">
          <Input label="City " crossOrigin="anonymous"></Input>
          <Input label="State/Province" crossOrigin="anonymous"></Input>
        </div>
        <div className="flex w-full space-x-7">
          <Input label="Zip Code" crossOrigin="anonymous"></Input>
          <Input label="Country" crossOrigin="anonymous"></Input>
        </div>
      </div>
      <div className="flex space-x-7 m-10 font-bold">
        <button className="w-44 h-10 bg-gray-900 text-white rounded-lg ">
          Save Profile
        </button>
        <button className="w-44 h-10 border-2 border-gray-900 text-gray-900 rounded-lg ">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default PublicProfile;
