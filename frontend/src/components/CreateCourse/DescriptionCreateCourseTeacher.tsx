import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { ICourseDetail, ITopic } from "@/types/type";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as topicApi from "@/api/topicApi/topicApi";
import * as teacherApi from "@/api/teacherApi/teacherApi";
import { toast } from "react-toastify";

const DescriptionCreateCourseTeacher = (): React.ReactElement => {
  const { dataDescription, handleSetDataDescription } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ICourseDetail>({
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
        setDataTypes(res);
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
        <div className="flex items-center justify-center w-full aspect-video max-h-[200px]">
          {imageFile && (
            <img
              src={imageFile[0] ? URL.createObjectURL(imageFile[0]) : ""}
              alt="avatar"
              className=""
            />
          )}
        </div>
      );
    } else if (typeof imageFile === "string") {
      return (
        <div className="flex items-center justify-center w-full">
          {imageFile && (
            <img src={imageFile?.toString()} alt="avatar" className="" />
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };
  const onSave = async (data: ICourseDetail) => {
    trigger();
    if (
      errors.title ||
      errors.topic_id ||
      errors.level ||
      errors.description ||
      (errors.image && data.image === undefined)
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setIsLoading(true);
    try {
      const res = await teacherApi.updateCourseTeacher({
        ...data,
      });

      setIsLoading(false);
      handleSetDataDescription(res);
      toast.success("Cập nhật thành công");
    } catch (error) {
      setIsLoading(false);
      toast.error("Cập nhật thất bại");
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
            {...register("title", { required: true })}
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-xs text-red-500">Vui lòng nhập tên khóa học</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Chủ đề khoá học
          </label>

          <select
            {...register("topic_id", { required: true })}
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
            {...register("level", { required: true })}
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
                {...register("image", { required: true })}
                name="image"
              />
            </label>
          </div>
          {errors.image && (
            <p className="text-xs text-red-500">Vui lòng chọn ảnh</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Miêu tả
          </label>
          <textarea
            {...register("description", { required: true })}
            name="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mô tả khoá học..."
          ></textarea>
          {errors.description && (
            <p className="text-xs text-red-500">Vui lòng nhập mô tả</p>
          )}
        </div>
        {/* <div className="grid gap-6 mb-2 md:grid-cols-2">
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
        </div> */}
        <div className="w-full flex justify-end mt-5">
          {isLoading ? (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <p className="ml-2"> Đang tải...</p>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSave)}
              disabled={false}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              Lưu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionCreateCourseTeacher;
