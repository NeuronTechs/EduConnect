import { IQuestionInfo } from "@/types/type";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContentQuestionMatchingImage = (props: {
  data: IQuestionInfo;
}): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div className="flex items-center justify-end gap-2"></div>
      </div>
      <div className="space-y-2 w-full">
        {props.data.answers.length === 0 && (
          <div className="flex items-center justify-center w-full p-2 rounded-md border border-transparent relative min-h-[45px]">
            <p className="text-sm font-normal ">Chưa có câu trả lời nào</p>
          </div>
        )}
        {props.data.answers.map((item) => (
          <ItemAnswer key={item.id} id={item.id} data={item} />
        ))}
      </div>
      <div className="w-full  mb-4 mt-4 flex items-center justify-center">
        <button
          type="submit"
          className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Plus size={15} />
          <span className="sr-only">Thêm</span>
        </button>
      </div>
    </div>
  );
};

export default ContentQuestionMatchingImage;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemAnswer = (props: { id: number; data: { id: number } }) => {
  return (
    <div className="flex items-stretch gap-1">
      {/* question */}
      <div className="flex-1 relative pl-7 pr-7 p-2 bg-white h-full flex flex-col justify-center gap-2 ">
        <h5 className="text-sm font-semibold text-gray-500">Câu Hỏi</h5>
        {/* form upload */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Bấm để tải lên</span> hoặc kéo
                và thả
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="min-h-[30px] flex items-center justify-between w-full">
          <div className="flex items-center justify-start gap-2 leading-3 text-black font-normal text-sm">
            <p>Bill</p>
            <Pencil size={15} className="text-gray-700" />
          </div>
        </div>

        <div className="w-4 h-6 bg-white border-r-4 border-t-4 border-b-4 border-blue-200/30 rounded-r-full absolute -right-4 z-1"></div>
      </div>
      {/* answer */}
      <div className="flex-1 relative pl-7 pr-7 p-2 bg-white h-full flex flex-col justify-between items-center gap-2 ">
        <div className="space-y-2 w-full">
          <h5 className="text-sm font-semibold text-gray-500">Đáp Án</h5>
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Bấm để tải lên</span> hoặc kéo
                và thả
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="min-h-[30px] flex items-center justify-between w-full">
          <div className="flex items-center justify-start leading-3 text-black font-normal text-sm ">
            <div className="flex items-center gap-2">
              <p>Bill</p>
              <Pencil size={15} className="text-gray-700" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-blue-500 font-medium text-xs bg-blue-50/20 hover:bg-blue-500 hover hover:text-white border border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-100 rounded-lg  px-3 py-0.5 text-center dark:focus:ring-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700"
            >
              <Plus size={15} />
              <p>Giải Thích</p>
            </button>
            <button className=" p-1  text-gray-500 hover:text-gray-600">
              <Trash size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
