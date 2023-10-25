import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { File } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";
interface IInputTitle {
  title: string;
}
const CreateLessonDocument = (): React.ReactElement => {
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
      <div className=""></div>
    </div>
  );
};

export default CreateLessonDocument;
