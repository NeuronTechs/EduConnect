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
  const [selectTypeVideo, setSelectTypeVideo] =
    React.useState<string>("default");
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
      {/* content */}
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
            onChange={(e) => setSelectTypeVideo(e.target.value)}
            value={selectTypeVideo}
          >
            <option defaultValue={"default"} value={"default"}>
              HTML (MP4)
            </option>
            <option value="youtube">youtube</option>
            <option value="Vimeo">Vimeo</option>
            <option value="Embed">Embed</option>
          </select>
        </div>
        <UploadVideoType selectTypeVideo={selectTypeVideo} />
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
          <TextEditor />
        </div>
        <div className="w-full">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
        </div>
      </div>
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
  );
};

export default CreateLessonVideo;

const UploadVideoType = (props: {
  selectTypeVideo: string;
}): React.ReactElement => {
  console.log(props.selectTypeVideo);
  return (
    <div className="w-full">
      {props.selectTypeVideo === "default" && (
        <>
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Video File
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
        </>
      )}
      {props.selectTypeVideo === "youtube" && (
        <>
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
        </>
      )}
      {props.selectTypeVideo === "Vimeo" && (
        <>
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
        </>
      )}
      {props.selectTypeVideo === "Embed" && (
        <>
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
        </>
      )}
    </div>
  );
};
