import { AddressBook, Note } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import courseApi from "@/api/courseApi";
import { useSelector } from "react-redux";
import * as topicApi from "@/api/topicApi/topicApi";
import { ITopic } from "@/types/type";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";

// type
interface IFormInput {
  typeCourse: string;
  title: string;
  topic: string;
  level: string;
}
const CreateCourseTitle = (props: {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  stepperIndex: number;
  handlerStepperNext: () => void;
  handlerStepperPrev: () => void;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
}) => {
  return <StepperCreateCourse {...props} />;
};

export default CreateCourseTitle;
// content data stepper create course
const StepperCreateCourse = ({
  register,
  setValue,
  stepperIndex,
  handlerStepperNext,
  handlerStepperPrev,
  handleSubmit,
}: {
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  stepperIndex: number;
  handlerStepperNext: () => void;
  handlerStepperPrev: () => void;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
}) => {
  const notifySuccess = () => {
    toast.success("Tạo Khoá Học Thành Công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const notifyError = () => {
    toast.error("Tạo khoá học thất bại, xin vui long thử lại sau.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const navigate = useNavigate();

  const useCurrentUser = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.authSlice.currentUser
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onCreateCourse = async (data: IFormInput) => {
    setIsLoading(true);
    // call api create course
    const dataCourse = {
      title: data.title,
      description: "",
      level: data.level,
      topic_id: data.topic,
      teacher_id: useCurrentUser.user_id,
    };
    try {
      await courseApi.createCourse(dataCourse);

      navigate(configRouter.manageCourse);
      notifySuccess();
    } catch (error) {
      console.log(error);
      notifyError();
    }
    setIsLoading(false);
  };
  return (
    <div className="p-2 space-y-2 h-[calc(100%-70px)] flex flex-col w-full ">
      {/* <ToastContainer /> */}
      <div className="w-full px-4 py-2 flex items-center justify-center bg-white rounded-md">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>

              <span className="hidden sm:inline-flex sm:ml-2 whitespace-nowrap text-sm">
                Chọn Loại Khoá Học
              </span>
            </span>
          </li>
          <li
            className={`flex md:w-full items-center ${
              stepperIndex >= 1 && "text-blue-600 dark:text-blue-500"
            } after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {stepperIndex >= 1 ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="mr-2">2</span>
              )}
              <span
                className={`hidden sm:inline-flex sm:ml-2 whitespace-nowrap text-sm `}
              >
                Tiêu đề nội dung
              </span>
            </span>
          </li>
          <li
            className={`flex items-center ${
              stepperIndex === 2 && "text-blue-600 dark:text-blue-500"
            }`}
          >
            {stepperIndex === 2 ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            ) : (
              <span className="mr-2">3</span>
            )}
            <span className="hidden sm:inline-flex sm:ml-2 whitespace-nowrap text-sm">
              Thể loại
            </span>
          </li>
        </ol>
      </div>
      <div className="bg-white rounded-md flex-1">
        <ContentStepperCreateCourse
          stepperIndex={stepperIndex}
          register={register}
          setValue={setValue}
        />
      </div>
      <div className="p-2 w-full flex justify-between bg-white rounded-md">
        <div>
          {stepperIndex > 0 && (
            <button
              className="text-base font-bold p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100"
              onClick={() => handlerStepperPrev()}
            >
              Trước
            </button>
          )}
        </div>
        <div>
          {stepperIndex < 2 ? (
            <button
              className="text-base font-bold p-2 bg-blue-500 text-white rounded-md"
              onClick={() => handlerStepperNext()}
            >
              Tiếp Theo
            </button>
          ) : (
            <>
              {isLoading ? (
                <button
                  className="text-base font-bold p-2 bg-blue-400 text-white rounded-md px-5"
                  disabled
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
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
                  Đang tạo khoá học...
                </button>
              ) : (
                <button
                  className="text-base font-bold p-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSubmit(onCreateCourse)}
                >
                  Tạo khoá học
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// content data course overview
const ContentStepperCreateCourse = (props: {
  stepperIndex: number;
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}) => {
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = React.useState("Chọn một thể loại");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 60);
    setValue(newValue);
  };

  const [dataTypes, setDataTypes] = React.useState<ITopic[]>([]);
  useEffect(() => {
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
  return (
    <div className="min-h-[500px] flex justify-center items-start pt-20">
      {props.stepperIndex === 0 && (
        <div className="flex gap-2 h-[250px]">
          <div
            className={
              "h-full w-[200px] flex flex-col items-center justify-start p-2 pt-10 shadow-md text-gray-500 gap-2 border border-blue-400 hover:bg-blue-100 cursor-pointer" +
              (selected === "lesson" ? " bg-blue-100" : "")
            }
            onClick={() => {
              props.setValue("typeCourse", "lesson");
              setSelected("lesson");
            }}
          >
            <AddressBook size={32} className="" />
            <h5 className="text-base font-bold">Khoá Học</h5>
            <p className="text-sm font-medium text-center">
              Các bài giảng video, trắc nghiệm, bài tập coding, v.v. có thể giúp
              bạn tạo nên trải nghiệm học tập phong phú.
            </p>
          </div>
          <div
            className={
              "h-full w-[200px] flex flex-col items-center justify-start p-2 pt-10 shadow-md text-gray-500 gap-2 border border-blue-400 hover:bg-blue-100 cursor-pointer" +
              (selected === "test" ? " bg-blue-100" : "")
            }
            onClick={() => {
              props.setValue("typeCourse", "test");
              setSelected("test");
            }}
          >
            <Note size={32} />
            <h5 className="text-base font-bold">Bài kiểm tra thực hành</h5>
            <p className="text-sm font-medium text-center">
              Giúp học viên luyện thi lấy chứng chỉ bằng cách đưa ra câu hỏi
              thực hành.
            </p>
          </div>
        </div>
      )}
      {props.stepperIndex === 1 && (
        <div className="flex flex-col gap-4 items-center">
          <h5 className="text-2xl font-bold">
            Vậy còn tiêu đề nội dung thì sao?
          </h5>
          <p className="text-sm font-medium text-gray-600">
            Đừng lo nếu bạn không nghĩ ra được một tiêu đề hay ngay bây giờ. Bạn
            có thể thay đổi sau.
          </p>
          <input
            {...props.register("title")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ví dụ: Học react từ cơ bản"
            required
            onChange={handleChange}
            maxLength={60}
          />
          <p className="text-sm text-gray-500">
            {value.length}/{60}
          </p>

          <div className="w-full flex flex-col items-center justify-center gap-3">
            <h5 className="text-2xl font-bold">
              Vậy khoá học hướng người trình độ nào?
            </h5>
            <p className="text-sm font-medium text-gray-600">
              Đừng lo nếu bạn không nghĩ ra được một tiêu đề hay ngay bây giờ.
              Bạn có thể thay đổi sau.
            </p>
            <select
              {...props.register("level")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Chọn một trình độ">Chọn một trình độ</option>
              <option value="Cơ bản">Cơ bản</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nâng cao">Nâng cao</option>
            </select>
          </div>
        </div>
      )}
      {props.stepperIndex === 2 && (
        <div className="flex flex-col gap-4 items-center">
          <h5 className="text-2xl font-bold">
            Thể loại nào phù hợp nhất với kiến thức mà bạn sẽ chia sẻ?
          </h5>
          <p className="text-sm font-medium text-gray-600">
            Nếu không chắc chắn về thể loại phù hợp, bạn có thể thay đổi sau.
          </p>

          <select
            id="countries"
            {...props.register("topic")}
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
      )}
    </div>
  );
};
