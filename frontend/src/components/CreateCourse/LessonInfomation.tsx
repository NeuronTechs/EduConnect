import { ClipboardText, MonitorPlay } from "@phosphor-icons/react";
import React from "react";
import SectionList from "./SectionList";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";

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
    console.log(idSectionCreate, type);
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
                    {/* =====================================================================update=============================================== */}
                    {/* <LessonTypeItem
                      icon={<File />}
                      title="bài học văn bản"
                      onClick={() => {
                        handlerAddNewLesson("document");
                      }}
                    /> */}
                    {/* ====================================================================================================================== */}
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
export default LessonInformation;

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
