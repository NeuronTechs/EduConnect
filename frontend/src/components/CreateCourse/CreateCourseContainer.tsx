import React from "react";

import { PlusCircle } from "@phosphor-icons/react";

import DescriptionCreateCourseTeacher from "./DescriptionCreateCourseTeacher";

import CreateContentCourse from "./CreateContentCourse";
import { CreateCourseContext } from "@/context/CreateCourseContext";
import { useForm } from "react-hook-form";
import { ICourseDetail } from "@/types/type";
import * as teacherApi from "@/api/teacherApi/teacherApi";

const CreateCourseContainer = (): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>("description");

  // data section
  return (
    <div className="w-full flex flex-col gap-2 h-full overflow-auto">
      <div className="bg-white flex items-center justify-center px-4 sticky top-[0px] shadow-sm">
        <TabContentCreateCourseTeacher tab={tab} setTab={setTab} />
      </div>
      <div className="flex w-full h-full flex-1 gap-2 pb-5 px-2 pt-2 overflow-auto">
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
    // case "faq":
    //   return <FAQCreateCourseTeacher />;
    // case "notice":
    //   return <NoticeCreateCourseTeacher />;
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
        {/* <li className="mr-2" onClick={() => props.setTab("faq")}>
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
        </li> */}
      </ul>
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
  const { dataDescription } = React.useContext(CreateCourseContext);
  const { register, handleSubmit } = useForm<ICourseDetail>({
    defaultValues: {
      ...dataDescription,
    },
  });
  console.log(dataDescription);
  const onSubmitTitle = (data: ICourseDetail) => {
    try {
      console.log(data);
      const res = teacherApi.updateCourseTeacher(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-start justify-center w-full">
      <div className="flex flex-col gap-4 bg-white p-2 min-w-[50%] px-6">
        <h5 className="text-base font-bold text-black">Giá Cả</h5>
        <div className="mb-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giá (VND)
          </label>
          <input
            {...register("price")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giá bán (VND)
          </label>
          <input
            {...register("discount")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* <div className="grid gap-6 mb-2 md:grid-cols-2">
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
              </div> *
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
        </div> */}
        {/* <div className="mb-2">
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
        </div> */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSubmit(onSubmitTitle)}
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
// =============================================================update=================================================================
// const FAQCreateCourseTeacher = (): React.ReactElement => {
//   return <></>;
// };

// const NoticeCreateCourseTeacher = (): React.ReactElement => {
//   return <></>;
// };
