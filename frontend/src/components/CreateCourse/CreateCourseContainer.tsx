import React from "react";

import DescriptionCreateCourseTeacher from "./DescriptionCreateCourseTeacher";

import CreateContentCourse from "./CreateContentCourse";
import { CreateCourseContext } from "@/context/CreateCourseContext";
import { useForm } from "react-hook-form";
import { ICourseDetail } from "@/types/type";
import * as teacherApi from "@/api/teacherApi/teacherApi";
import { toast } from "react-toastify";

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
interface IInputTarget {
  study: {
    study1: string;
    study2: string;
    study3: string;
    study4: string;
    study5: string;
    study6: string;
  };
  requirement: {
    requirement1: string;
    requirement2: string;
    requirement3: string;
    requirement4: string;
    requirement5: string;
    requirement6: string;
  };
}
const TargetCreateCourseTeacher = (): React.ReactElement => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const initialData: IInputTarget = {
    study: {
      study1: "",
      study2: "",
      study3: "",
      study4: "",
      study5: "",
      study6: "",
    },
    requirement: {
      requirement1: "",
      requirement2: "",
      requirement3: "",
      requirement4: "",
      requirement5: "",
      requirement6: "",
    },
  };
  const { dataDescription } = React.useContext(CreateCourseContext);

  const { register, handleSubmit, setValue } = useForm<IInputTarget>({
    defaultValues: {
      study: dataDescription?.study ? dataDescription.study : initialData.study,
      requirement: dataDescription?.requirement
        ? dataDescription.requirement
        : initialData.requirement,
    },
  });
  const saveTarget = async (data: IInputTarget) => {
    if (!dataDescription) return;
    setIsLoading(true);
    try {
      await teacherApi.updateCourseTeacher({
        ...dataDescription,
        study: data.study,
        requirement: data.requirement,
      });
      setIsLoading(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Cập nhật thất bại");
    }
  };
  React.useEffect(() => {
    if (dataDescription) {
      setValue("study", dataDescription.study);
      setValue("requirement", dataDescription.requirement);
    }
  }, [dataDescription, setValue]);
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
            Bạn phải nhập 6 mục tiêu hoặc kết quả học tập mà học viên có thể
            mong đợi đạt được sau khi hoàn thành khóa học.
          </p>

          <input
            {...register("study.study1", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("study.study2", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("study.study3", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("study.study4", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("study.study5", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("study.study6", { required: true })}
            placeholder="Ví dụ: Học viên sẽ có thể tạo ra một ứng dụng web đơn giản..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          {/* <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
          {/* <p className="text-base font-normal text-blue-500 py-3 flex gap-2 items-center leading-3 cursor-pointer">
            <PlusCircle size={20} />
            Thêm nội dung vào phản hồi của bạn
          </p> */}
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

          <input
            {...register("requirement.requirement1", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("requirement.requirement2", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("requirement.requirement3", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("requirement.requirement4", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("requirement.requirement5", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            {...register("requirement.requirement6", { required: true })}
            placeholder="Ví dụ: Không có yêu cầu hoặc điều kiện tiên quyết nào..."
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* <p className="text-base font-normal text-blue-500 py-3 flex gap-2 items-center leading-3 cursor-pointer">
            <PlusCircle size={20} />
            Thêm nội dung vào phản hồi của bạn
          </p> */}
        </div>
        <div className="flex items-center justify-start py-5 px-4">
          {isLoading ? (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
              onClick={handleSubmit(saveTarget)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lưu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const PriceCreateCourseTeacher = (): React.ReactElement => {
  const { dataDescription } = React.useContext(CreateCourseContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm<ICourseDetail>({
    defaultValues: {
      ...dataDescription,
    },
  });
  const onSubmitTitle = async (data: ICourseDetail) => {
    try {
      setIsLoading(true);
      await teacherApi.updateCourseTeacher(data);
      setIsLoading(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Cập nhật thất bại");
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
              onClick={handleSubmit(onSubmitTitle)}
              type="button"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              lưu
            </button>
          )}
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
