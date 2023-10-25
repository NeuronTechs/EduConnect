import React from "react";

import SectionList from "./SectionList";
import { ClipboardText, File, MonitorPlay } from "@phosphor-icons/react";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import CreateLessonQuiz from "./CreateLesson/CreateLessonQuiz";
import CreateLessonVideo from "./CreateLesson/CreateLessonVideo";
import CreateLessonDocument from "./CreateLesson/CreateLessonDocument";

const CreateCourseContainer = (): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  const { selectLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  // data section

  return (
    <div className="w-full flex flex-col gap-2 h-full">
      <div className="bg-white flex items-center justify-start px-4">
        <TabContentCreateCourseTeacher />
      </div>
      <div className="flex w-full flex-1 gap-2">
        <div className=" bg-white rounded-md w-[25%] h-full overflow-auto">
          <LessonInformation
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </div>
        <div className="h-full overflow-auto bg-white p-2 flex-1">
          {selectLesson?.type === "document" && <CreateLessonDocument />}
          {selectLesson?.type === "video" && <CreateLessonVideo />}
          {selectLesson?.type === "quiz" && <CreateLessonQuiz />}
        </div>
      </div>
    </div>
  );
};

export default CreateCourseContainer;
// tab`content
const TabContentCreateCourseTeacher = (): React.ReactElement => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2">
          <a
            href="#"
            className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Mô tả
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
            aria-current="page"
          >
            <svg
              className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Nội dung
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
            </svg>
            Giá Cả
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
            FAQ
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
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
      className="px-3 py-4 flex flex-col items-center justify-center border hover:border-blue-500 gap-3 rounded-md h-30 w-30 cursor-pointer"
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
