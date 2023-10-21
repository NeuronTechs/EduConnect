import { AddressBook, Note } from "@phosphor-icons/react";
import React from "react";

const CreateCourseTitle = () => {
  return <StepperCreateCourse />;
};

export default CreateCourseTitle;

const StepperCreateCourse = () => {
  const [stepperIndex, setStepperIndex] = React.useState<number>(0);

  const handlerStepperNext = () => {
    if (stepperIndex < 2) {
      setStepperIndex((prev) => prev + 1);
    }
  };
  const handlerStepperPrev = () => {
    if (stepperIndex > 0) {
      setStepperIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="p-2 space-y-2 h-full flex flex-col">
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
        <ContentStepperCreateCourse stepperIndex={stepperIndex} />
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
            <button className="text-base font-bold p-2 bg-blue-500 text-white rounded-md">
              Tạo khoá học
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentStepperCreateCourse = (props: { stepperIndex: number }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 60);
    setValue(newValue);
  };
  const dataSelectTypeCourse = [
    "Chọn một thể loại",
    "Phát triển",
    "Kinh doanh",
    "Tài chính && kế toán",
    "CNTT && Phần mềm",
    "Khoa học",
    "Kỹ năng mềm",
    "Marketing",
    "Ngoại ngữ",
    "Thiết kế",
    "Sức khỏe && Thể hình",
    "khác",
  ];
  return (
    <div className="min-h-[500px] flex justify-center items-start pt-20">
      {props.stepperIndex === 0 && (
        <div className="flex gap-2 h-[250px]">
          <div className="h-full w-[200px] flex flex-col items-center justify-start p-2 pt-10 shadow-md text-gray-500 gap-2 border border-blue-400">
            <AddressBook size={32} className="" />
            <h5 className="text-base font-bold">Khoá Học</h5>
            <p className="text-sm font-medium text-center">
              Các bài giảng video, trắc nghiệm, bài tập coding, v.v. có thể giúp
              bạn tạo nên trải nghiệm học tập phong phú.
            </p>
          </div>
          <div className="h-full w-[200px] flex flex-col items-center justify-start p-2 pt-10 shadow-md text-gray-500 gap-2 border border-blue-400">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // value="Chọn một thể loại" // set default value to "it"
          >
            {dataSelectTypeCourse.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
      )}
    </div>
  );
};
