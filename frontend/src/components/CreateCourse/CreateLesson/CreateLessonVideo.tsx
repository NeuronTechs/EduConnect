import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { Video } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";
import TextEditor from "./TextEditor/TextEditor";

interface IInputTitle {
  title: string;
}
const CreateLessonVideo = () => {
  const { selectLesson, handleEditLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  const { register, handleSubmit } = useForm<IInputTitle>();
  const onSubmitTitle = (data: IInputTitle) => {
    const lesson = selectLesson;
    lesson!.title = data.title;
    if (!lesson) return;
    handleEditLesson(lesson.idSection, lesson);
  };
  return (
    <div className="w-full h-full">
      {/* header */}
      <div className="w-full p-2 border-b-2 border-gray-200 flex items-center gap-2">
        <div className="flex flex-1">
          <div className=" flex gap-2 p-2 items-center text-gray-400 bg-gray-200 rounded-tl-md rounded-bl-md">
            <Video size={20} />
            <p className="text-xs  font-bold leading-3">Tên Video bài giảng</p>
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
      <div className="content py-4 px-2 space-y-4">
        <div className="w-full">
          <label
            form="first_name"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Loại nguồn
          </label>
          <select
            id="Source_type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={"default"}>
              HTML (MP4)
            </option>
            <option value="US">youtube</option>
            <option value="CA">Vimeo</option>
            <option value="FR">Embed</option>
          </select>
        </div>
        <div className="w-full">
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Video URL
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="video URL..."
          ></textarea>
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
            Mô tả ngắn về bài giảng
          </label>
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default CreateLessonVideo;
