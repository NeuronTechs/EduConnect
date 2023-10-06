import React from "react";
interface props {
  className: string;
}
const ListCategoryLoading = (props: props): React.ReactElement => {
  return (
    <div className={`grid grid-cols-4 gap-5 ${props.className}`}>
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
      <CardCategoryLoading />
    </div>
  );
};

export default ListCategoryLoading;
const CardCategoryLoading = (): React.ReactElement => {
  return (
    <div
      role="status"
      className="animate-pulse md:space-y-0 md:space-x-4 md:flex items-center w-full bg-white px-3 py-4 rounded-md"
    >
      <div className="w-full space-y-3 flex flex-col">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700  "></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  "></div>
      </div>
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded sm:w-10 dark:bg-gray-700">
        <svg
          className="w-4 h-4 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
