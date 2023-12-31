import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { File } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";
import TextEditor from "./TextEditor/TextEditor";
interface IInputTitle {
  title: string;
}
const CreateLessonDocument = (): React.ReactElement => {
  const { selectLesson, handleEditLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  const { register, handleSubmit } = useForm<IInputTitle>({
    defaultValues: {
      title: selectLesson?.name,
    },
  });
  console.log(selectLesson?.name);
  const onSubmitTitle = (data: IInputTitle) => {
    const lesson = selectLesson;
    lesson!.name = data.title;
    if (!lesson) return;
    handleEditLesson(lesson);
  };
  return (
    <div className="w-full h-full">
      <div className="w-full p-2 border-b-2 border-gray-200 flex items-center gap-2">
        <div className="flex flex-1">
          <div className=" flex gap-2 p-2 items-center text-gray-400 bg-gray-200 rounded-tl-md rounded-bl-md">
            <File size={20} />
            <p className="text-xs  font-bold leading-3">Tên bài viết</p>
          </div>
          <div className=" flex flex-1 items-center p-2 border border-gray- rounded-r-md">
            <input
              {...register("title")}
              placeholder="Nhập tiêu đề..."
              className="text-sm w-full outline-none border-none"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmitTitle)}
          type="button"
          disabled={true}
          className="text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lưu
        </button>
      </div>
      <div className="content space-y-2 py-3">
        <div className="w-full">
          <label
            form="first_name"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Thời lượng bài học
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Thời lượng bài học"
          />
        </div>

        <div className="w-full">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              xem trước khoá học
            </span>
          </label>
        </div>

        <div className="w-full">
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Mô tả về bài giảng
          </label>
          <TextEditor value="" onEditorChange={() => {}} />
        </div>
        {/* <div className="w-full">
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Tài liệu bài giảng
          </label>
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
                  MP4 (MAX. 1G)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div> */}
        <div className="h-50px] w-full relative">
          <div className="sticky bottom-0 left-0 w-full flex justify-end">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLessonDocument;
