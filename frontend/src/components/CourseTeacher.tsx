import {
  ArrowRight,
  FolderPlus,
  PencilSimple,
  SealCheck,
  UsersThree,
} from "@phosphor-icons/react";
import React from "react";
import { Rating } from "flowbite-react";
import { Link } from "react-router-dom";
import { configRouter } from "@/configs/router";
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
const CourseTeacher = (props: IProps): React.ReactElement => {
  return (
    <div className="rounded-2xl bg-white p-2 flex flex-col gap-2 shadow-sm w-full">
      <div className="w-full max-h-[150px] relative">
        <img
          src={props.data.thumbnail}
          alt={props.data.title}
          className="w-full h-full object-fill rounded-2xl"
        />
        <div className="bg-blue-500 absolute top-1 right-2 text-xs font-bold text-white px-2 py-1 rounded-full">
          {props.data.status}
        </div>
      </div>
      <div className="card-content px-1 space-y-2 mb-2">
        {/* content */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h5 className="xl:text-lg lg:text-base md:text-sm font-semibold text-black">
              {props.data.title}
            </h5>
            <p className="text-xs font-normal text-gray-600">
              {props.data.teacher}
            </p>
          </div>
          <div className="rounded-full md:h-[40px] md:w-[40px] h-[30px] w-[30px] overflow-hidden">
            <img
              src={props.data.avatarTeacher}
              alt={props.data.teacher}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* rating */}
        <div className="w-full flex justify-between flex-col gap-3">
          <div className="flex gap-1 items-center">
            <Rating size={"sm"}>
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
            </Rating>
            <p className="text-xs font-medium">5</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-black font-extralight">
              {`${props.data.priceOfficial} VND`}
            </p>
            <p className="text-xs text-gray-500 font-extralight line-through">
              {`${props.data.originalPrice} VND`}
            </p>
          </div>
        </div>
        {/* number detail */}
        <div className="flex gap-1 justify-between">
          <div className="flex items-center gap-1 p-1 ">
            <div>
              <FolderPlus size={15} />
            </div>
            <p className="text-xs font-bold leading-3">
              {props.data.numberLesson}
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 ">
            <div>
              <SealCheck size={15} />
            </div>
            <p className="text-xs font-bold leading-3">
              {props.data.numberSecurity}
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 ">
            <div>
              <UsersThree size={15} />
            </div>
            <p className="text-xs font-bold leading-3">
              {props.data.numberStudent}
            </p>
          </div>
        </div>
        {/* button */}
        <div className="flex w-full justify-between ">
          <Link to={configRouter.createCourse}>
            <div className="flex items-center gap-2 text-gray-500 p-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer">
              <PencilSimple size={20} />
              <p className="text-sm font-medium">Chỉnh sửa</p>
            </div>
          </Link>

          <Link to={`/course/${props.data.id}`}>
            <div className="flex gap-1 bg-blue-300 rounded-md items-center justify-center px-4 py-2 text-white min-w-[70px]">
              <p className="text-base">Xem</p>
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseTeacher;
