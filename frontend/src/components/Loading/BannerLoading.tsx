import React from "react";

const BannerLoading = () => {
  return (
    <div className="w-full bg-white rounded-xl">
      <div
        role="status"
        className="space-y-2.5 animate-pulse max-w-lg py-10 min-h-[250px] "
      >
        <div className="flex flex-col space-y-4 ml-10 ">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px]"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px]"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BannerLoading;
