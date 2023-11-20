import React from "react";

import SectionList from "./SectionList";
import {
  ClipboardText,
  File,
  MonitorPlay,
  PlusCircle,
} from "@phosphor-icons/react";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import CreateLessonQuiz from "./CreateLesson/CreateLessonQuiz";
import CreateLessonVideo from "./CreateLesson/CreateLessonVideo";
import CreateLessonDocument from "./CreateLesson/CreateLessonDocument";
import CreateQuizProvider from "@/context/CreateQuizContext";
import DescriptionCreateCourseTeacher from "./DescriptionCreateCourseTeacher";
import courseApi from "@/api/courseApi";

const CreateCourseContainer = (): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>("description");

  // data section

  return (
    <div className="w-full flex flex-col gap-2 h-full ">
      <div className="bg-white flex items-center justify-center px-4 sticky top-[60px] shadow-sm">
        <TabContentCreateCourseTeacher tab={tab} setTab={setTab} />
      </div>
      <div className="flex w-full flex-1 gap-2 pb-5 px-2 pt-2">
        <ContainerCreateCourseTeacher
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          tab={tab}
        />
      </div>
    </div>
  );
};

export default CreateCourseContainer;

const ContainerCreateCourseTeacher = (props: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  tab: string;
}): React.ReactElement => {
  switch (props.tab) {
    case "description":
      return <DescriptionCreateCourseTeacher />;
    case "target":
      return <TargetCreateCourseTeacher />;
    case "content":
      return <CreateContentCourse {...props} />;
    case "price":
      return <PriceCreateCourseTeacher />;
    case "faq":
      return <FAQCreateCourseTeacher />;
    case "notice":
      return <NoticeCreateCourseTeacher />;
    default:
      return <div className="flex items-center justify-center "></div>;
  }
};
// tab`content
const TabContentCreateCourseTeacher = (props: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2" onClick={() => props.setTab("description")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "description"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
          >
            Mô tả
          </a>
        </li>
        <li className="mr-2" onClick={() => props.setTab("target")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "target"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
            aria-current="page"
          >
            Mục Tiêu
          </a>
        </li>
        <li className="mr-2" onClick={() => props.setTab("content")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "content"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
            aria-current="page"
          >
            Nội dung
          </a>
        </li>
        <li className="mr-2" onClick={() => props.setTab("price")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "price"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
          >
            Giá Cả
          </a>
        </li>
        <li className="mr-2" onClick={() => props.setTab("faq")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "faq"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
          >
            FAQ
          </a>
        </li>
        <li className="mr-2" onClick={() => props.setTab("notice")}>
          <a
            href="#"
            className={`inline-flex items-center justify-center p-4 ${
              props.tab === "notice"
                ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 "
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
          >
            Lưu ý
          </a>
        </li>
      </ul>
    </div>
  );
};

const LessonInformation = (props: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const { handleAddNewLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  const [idSectionCreate, setIdSectionCreate] = React.useState<string>("");

  const handlerCloseModal = () => {
    props.setIsOpenModal(false);
  };

  const handlerAddNewLesson = (type: string) => {
    if (idSectionCreate === "") return;
    handleAddNewLesson(idSectionCreate, type);
    props.setIsOpenModal(false);
  };

  return (
    <>
      <SectionList
        setIsOpenModal={props.setIsOpenModal}
        setIdSectionCreate={setIdSectionCreate}
      />
      {/* modal add new lesson */}
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`fixed top-0 left-0 right-0 z-50 bottom-0 ${
          !props.isOpenModal && "hidden"
        } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full bg-gray-500 bg-opacity-75 transition-opacity`}
      >
        <div className="relative w-full h-full  flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700  min-w-[30%] gap-4">
            <button
              onClick={handlerCloseModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col">
                <h5 className="text-lg font-bold">Chọn loại bài học</h5>
                <p className="text-xs font-normal text-gray-500">
                  Chọn loại vật liệu để tiếp tục
                </p>
              </div>

              {/* content type */}
              <div className="flex flex-col  gap-4">
                <div className="flex flex-col  gap-2">
                  <h5 className="text-xs font-bold text-gray-600">
                    NỘI DUNG HỌC TẬP
                  </h5>
                  <div className="flex items-center justify-start gap-4">
                    <LessonTypeItem
                      icon={<File />}
                      title="bài học văn bản"
                      onClick={() => {
                        handlerAddNewLesson("document");
                      }}
                    />
                    <LessonTypeItem
                      icon={<MonitorPlay />}
                      title="bài học video"
                      onClick={() => {
                        handlerAddNewLesson("video");
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col  gap-2">
                  <h5 className="text-xs font-bold text-gray-600">KIỂM TRA</h5>
                  <div className="flex items-center justify-start gap-4">
                    <LessonTypeItem
                      icon={<ClipboardText />}
                      title="Bài Kiểm Tra"
                      onClick={() => {
                        handlerAddNewLesson("quiz");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// modal add new item type lesson
const LessonTypeItem = (props: {
  title: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler;
}): React.ReactElement => {
  return (
    <div
      className="py-4 flex flex-col items-center justify-center border hover:border-blue-500 gap-3 rounded-md h-30 w-30 cursor-pointer px-6"
      onClick={props.onClick}
    >
      {React.cloneElement(props.icon as React.ReactElement, {
        size: 40,
        className: "text-blue-500",
      })}

      <p className="text-xs font-medium text-gray-600">{props.title}</p>
    </div>
  );
};

const TargetCreateCourseTeacher = (): React.ReactElement => {
  const [dataTarget, setDataTarget] = React.useState<{
    study: string[];
    requirement: string[];
  }>({ study: ["1"], requirement: ["2"] });

  return (
    <div className="flex items-start justify-center w-full">
      <div className="flex flex-col gap-4 bg-white p-2 min-w-[50%] px-6">
        <h5 className="text-base font-bold text-black">Học viên mục tiêu</h5>
        <p className="text-black font-normal text-sm">
          Các mô tả sau sẽ hiển thị công khai trên Trang tổng quan khóa học của
          bạn và sẽ tác động trực tiếp đến thành tích khóa học, đồng thời giúp
          học viên quyết định xem khóa học đó có phù hợp với họ hay không.
        </p>

        <div className="mb-2 space-y-4">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Học viên sẽ học được gì trong khóa học của bạn?
          </label>
          <p className="text-black font-normal text-sm">
            Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà học viên có
            thể mong đợi đạt được sau khi hoàn thành khóa học.
          </p>
          {dataTarget.study.map((item) => {
            return (
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={item}
              />
            );
          })}
          {/* <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
          <p className="text-base font-normal text-blue-500 py-3 flex gap-2 items-center leading-3 cursor-pointer">
            <PlusCircle size={20} />
            Thêm nội dung vào phản hồi của bạn
          </p>
        </div>
        <div className="mb-2 space-y-4">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn là
            gì?
          </label>
          <p className="text-black font-normal text-sm">
            Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên
            bắt buộc phải có trước khi tham gia khóa học. Nếu bạn không có yêu
            cầu nào, hãy tận dụng phần này và coi đây là cơ hội để bạn hạ thấp
            tiêu chuẩn cho người mới bắt đầu.
          </p>
          {dataTarget.requirement.map((item) => {
            return (
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={item}
              />
            );
          })}
          <p className="text-base font-normal text-blue-500 py-3 flex gap-2 items-center leading-3 cursor-pointer">
            <PlusCircle size={20} />
            Thêm nội dung vào phản hồi của bạn
          </p>
        </div>
      </div>
    </div>
  );
};
const PriceCreateCourseTeacher = (): React.ReactElement => {
  return (
    <div className="flex items-start justify-center w-full">
      <div className="flex flex-col gap-4 bg-white p-2 min-w-[50%] px-6">
        <h5 className="text-base font-bold text-black">Giá Cả</h5>
        <div className="mb-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giá ($)
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giá bán ($)
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="grid gap-6 mb-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ngày bắt đầu bán hàng
            </label>
            <div className="relative max-w-sm">
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div> */}
              <input
                data-date-format="dd/mm/yyyy"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ngày kết thúc bán hàng
            </label>
            <input
              data-date-format="dd/mm/yyyy"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Điểm cho một khóa học
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            lưu
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQCreateCourseTeacher = (): React.ReactElement => {
  return <></>;
};

const NoticeCreateCourseTeacher = (): React.ReactElement => {
  return <></>;
};

const CreateContentCourse = (props: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const { selectLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);
  // loading section
  const [isLoading, setIsLoading] = React.useState(false);

  // React.useEffect(() => {
  //   // Simulate loading content for 2 seconds
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);
  // api get data section of course
  React.useEffect(() => {
    const requestApi = async () => {
      try {
        const res = await courseApi.getSectionCourse(props.idCourse);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    requestApi();
  }, []);
  return (
    <>
      <div className="w-[25%] h-full overflow-auto">
        <LessonInformation
          isOpenModal={props.isOpenModal}
          setIsOpenModal={props.setIsOpenModal}
        />
      </div>
      <div className="h-full overflow-auto bg-white p-2 flex-1">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : selectLesson?.type === "document" ? (
          <CreateLessonDocument />
        ) : selectLesson?.type === "video" ? (
          <CreateLessonVideo />
        ) : selectLesson?.type === "quiz" ? (
          <CreateQuizProvider>
            <CreateLessonQuiz />
          </CreateQuizProvider>
        ) : (
          <div className="w-full flex items-center justify-center"></div>
        )}
      </div>
    </>
  );
};
