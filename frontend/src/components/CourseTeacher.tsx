import {
  ArrowRight,
  PencilSimple,
  SealCheck,
  UsersThree,
} from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { ICourseDetail } from "@/types/type";
import ImageWithError from "./ImageWithError";
import assets from "@/assets";
import { CreateCourseContext } from "@/context/CreateCourseContext";
import Start from "./Start";
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ICourseDetail;
}
const CourseTeacher = (props: IProps): React.ReactElement => {
  const { handleSetDataDescription } = React.useContext(CreateCourseContext);

  return (
    <div className="rounded-2xl bg-white p-2 flex flex-col gap-2 shadow-sm w-full justify-between">
      <div className=" flex flex-col w-full gap-2">
        <div className="w-full max-h-[150px] relative">
          <ImageWithError
            src={
              props.data.image
                ? props.data.image.toString()
                : assets.images.noBg
            }
            alt={props.data.title}
            fallbackSrc={assets.images.noBg}
            className="w-full h-full object-fill rounded-2xl"
          />
          <div className="bg-blue-500 absolute top-1 right-2 text-xs font-bold text-white px-2 py-1 rounded-full">
            {parseInt(`${props.data.status}`) === 0 && "Bảng nháp"}
            {parseInt(`${props.data.status}`) === 1 && "Đang duyệt"}
            {parseInt(`${props.data.status}`) === 2 && "Công khai"}
            {parseInt(`${props.data.status}`) === 3 && "Bị ẩn"}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[calc(100%-45px)] flex-col">
            <h5 className="flex-1 xl:text-lg lg:text-base md:text-sm font-semibold text-black w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {props.data.title}
            </h5>
            <p className="text-xs font-normal text-gray-600">
              {props.data.user?.full_name}
            </p>
          </div>
          <div className="rounded-full md:h-[40px] md:w-[40px] h-[30px] w-[30px] overflow-hidden">
            <ImageWithError
              src={
                props.data.user?.avatar
                  ? props.data.user?.avatar
                  : assets.images.noAvatar
              }
              alt={props.data.user?.full_name}
              fallbackSrc={assets.images.noAvatar}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="card-content px-1 space-y-2 mb-2">
        {/* content */}

        {/* rating */}
        <div className="w-full flex justify-between flex-col gap-3">
          <div className="flex gap-1 items-center">
            <Start
              scoreReview={Math.round(
                props.data.ranking ? props.data.ranking : 0
              )}
              totalReview={
                props.data.total_review ? props.data.total_review : 0
              }
            />
            <p className="text-xs font-medium">{}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 font-extralight line-through">
              {`${props.data.price ? props.data.price : 0} VND`}
            </p>
            <p className="text-xs text-black font-extralight">
              {`${props.data.discount ? props.data.discount : 0} VND`}
            </p>
          </div>
        </div>
        <div className="w-full">
          {/* number detail */}
          <div className="flex gap-1 justify-between px-2 py-2">
            {/* <div className="flex items-center gap-1 p-1 ">
              <div>
                <FolderPlus size={15} />
              </div>
              <p className="text-xs font-bold leading-3">
                {props.data.total_lecture ? props.data.total_lecture : 0}
              </p>
            </div> */}
            <div className="flex items-center gap-1 p-1 ">
              <div>
                <SealCheck size={15} />
              </div>
              <p className="text-xs font-bold leading-3">
                {props.data.total_review ? props.data.total_review : 0}
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 ">
              <div>
                <UsersThree size={15} />
              </div>
              <p className="text-xs font-bold leading-3">
                {props.data.total_student ? props.data.total_student : 0}
              </p>
            </div>
          </div>
          {/* button */}
          <div className="flex w-full justify-between ">
            <Link
              to={configRouter.manageCourse.slice(0, -3) + props.data.course_id}
              onClick={() => handleSetDataDescription(props.data)}
            >
              <div className="flex items-center gap-2 text-gray-500 p-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer">
                <PencilSimple size={20} />
                <p className="text-sm font-medium">Chỉnh sửa</p>
              </div>
            </Link>

            <Link to={`/course/${props.data.course_id}`}>
              <div className="flex gap-1 bg-blue-300 rounded-md items-center justify-center px-4 py-2 text-white min-w-[70px]">
                <p className="text-base">Xem</p>
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTeacher;
