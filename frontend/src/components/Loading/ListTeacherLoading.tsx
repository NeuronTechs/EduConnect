import React from "react";

const ListTeacherLoading = (props: { numberShow: number }) => {
  return (
    <div className={`grid grid-cols-${props.numberShow} gap-3 w-full`}>
      <CardTeacherLoading />
      <CardTeacherLoading />
      <CardTeacherLoading />
      <CardTeacherLoading />
      <CardTeacherLoading />
      <CardTeacherLoading />
    </div>
  );
};

export default ListTeacherLoading;

const CardTeacherLoading = () => {
  return (
    <div
      role="status"
      className=" col-span-1 w-full animate-pulse bg-white rounded-xl px-3 py-4"
    >
      <div className="flex w-full space-x-4 mb-4">
        <div>
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[calc(100%-20px)] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[calc(100%-20px)] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[calc(100%-20px)]"></div>
        </div>
      </div>
      <div className="flex items-center w-full justify-between space-x-4">
        <div className="h-10 bg-gray-200 rounded-xl dark:bg-gray-700 w-[100px] "></div>
        <div className="h-10 bg-gray-200 rounded-xl dark:bg-gray-700 w-10 "></div>
        <div className="h-10 bg-gray-200 rounded-xl dark:bg-gray-700 w-10 "></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
