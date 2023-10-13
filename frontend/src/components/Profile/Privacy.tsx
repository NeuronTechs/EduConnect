import React from "react";
import { Checkbox } from "@material-tailwind/react";
const Privacy = () => {
  return (
    <div className=" ">
      <div className="text-center border-b-2 border-gray-500">
        <h1 className="font-bold text-black">Privacy</h1>
        Modify your privacy settings here.
      </div>
      <div className="text-black font-bold mt-10">
        <h1> Profile Page Setting</h1>
        <Checkbox
          label={
            <h1 className="text-black"> Show your profile to logged-users </h1>
          }
          crossOrigin={""}
        />
        <Checkbox
          label={
            <h1 className="text-black">
              {" "}
              Show your course you're talking on your profile page
            </h1>
          }
          crossOrigin={""}
        />
      </div>
      <button className="w-44 h-10 bg-blue-400 text-white rounded-lg mt-10">
        Save
      </button>
    </div>
  );
};

export default Privacy;
