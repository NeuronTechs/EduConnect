import React from "react";

const ContentQuestionTrueFalse = (props: { data: [] }) => {
  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div className="flex items-center justify-end gap-2"></div>
      </div>
      <div className="w-full space-y-2">
        <div className="w-full px-4 p-3 bg-white flex items-center justify-start">
          <input
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Đúng
          </label>
        </div>
        <div className="w-full px-4 p-3 bg-white flex items-center justify-start">
          <input
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Sai
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContentQuestionTrueFalse;
