import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { ICourseDetail, ITopic } from "@/types/type";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as topicApi from "@/api/topicApi/topicApi";
import * as teacherApi from "@/api/teacherApi/teacherApi";

const DescriptionCreateCourseTeacher = (): React.ReactElement => {
  const { dataDescription } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  const { register, watch, handleSubmit, reset } = useForm<ICourseDetail>({
    defaultValues: dataDescription,
  });
  // reset form when dataDescription change
  useEffect(() => {
    if (dataDescription) {
      reset(dataDescription);
    }
  }, [dataDescription, reset]);

  const [dataTypes, setDataTypes] = React.useState<ITopic[]>([]);
  // get all topic
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await topicApi.getAllTopic();
        setDataTypes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const renderImage = () => {
    const imageFile = watch("image");
    if (imageFile?.length && imageFile instanceof FileList) {
      return (
        <div className="flex items-center justify-center w-full">
          <img
            src={imageFile[0] ? URL.createObjectURL(imageFile[0]) : ""}
            alt="avatar"
            className=""
          />
        </div>
      );
    } else if (typeof imageFile === "string") {
      return (
        <div className="flex items-center justify-center w-full">
          <img src={imageFile?.toString()} alt="avatar" className="" />
        </div>
      );
    } else {
      return <></>;
    }
  };
  const onSave = async (data: ICourseDetail) => {
    try {
      const res = await teacherApi.updateCourseTeacher(data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-start justify-center w-full">
      <div className="flex flex-col gap-4 bg-white p-2 min-w-[50%] px-6">
        <h5 className="text-base font-bold text-black">Thông tin khóa học</h5>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tên khóa học
          </label>
          <input
            {...register("title")}
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Chủ đề khoá học
          </label>

          <select
            {...register("topic_id")}
            name="topic_id"
            // name="topic_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // value="Chọn một thể loại" // set default value to "it"
          >
            {dataTypes.map((topic) => {
              return (
                <option value={topic.topic_id} key={topic.topic_id}>
                  {topic.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mức độ
          </label>
          <select
            {...register("level")}
            name="level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Chọn một trình độ">Chọn một trình độ</option>
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Nâng cao">Nâng cao</option>
          </select>
          {/* <input
            type="text"
            {...register("level")}
            name="level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <div className="mb-2 space-y-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Hình ảnh
          </label>
          {renderImage()}
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple={false}
                {...register("image")}
                name="image"
              />
            </label>
          </div>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Miêu tả
          </label>
          <textarea
            {...register("description")}
            name="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mô tả khoá học..."
          ></textarea>
        </div>
        <div className="grid gap-6 mb-2 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Thời lượng khóa học
            </label>
            <input
              type="text"
              {...register("duration")}
              name="duration"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Thời lượng video
            </label>
            <input
              type="text"
              {...register("duration_type")}
              name="duration_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-5">
          <button
            type="button"
            onClick={handleSubmit(onSave)}
            disabled={false}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCreateCourseTeacher;
