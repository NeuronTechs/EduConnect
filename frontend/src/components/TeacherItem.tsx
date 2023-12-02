import React from "react";
import {
  DotsThreeOutlineVertical,
  EnvelopeSimpleOpen,
} from "@phosphor-icons/react";
import { ITeacher } from "../types/type";
import { Link } from "react-router-dom";
import ImageWithError from "./ImageWithError";
import assets from "@/assets";
import { configRouter } from "@/configs/router";
interface props {
  data: ITeacher;
}
const TeacherItem = (props: props): React.ReactElement => {
  return (
    <div className="bg-white rounded-xl p-2.5 space-y-5 w-full gap-2 py-2">
      <div className="flex gap-4 justify-center">
        <div className="w-50px">
          <ImageWithError
            src={props.data.user?.avatar}
            alt={props.data.user?.full_name}
            fallbackSrc={assets.images.noAvatar}
            className="rounded-full object-fill h-[50px] w-[50px]"
          />
        </div>
        <div className="flex flex-col space-y-2 flex-1 w-[calc(100%-60px)]">
          <h6 className="text-sm font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
            {props.data.user?.full_name}
          </h6>
          <p className="text-sm font-light w-full text-ellipsis overflow-hidden whitespace-nowrap">
            {props.data.major}
          </p>
          <p className="text-sm font-light w-full text-ellipsis overflow-hidden whitespace-nowrap">
            {props.data.school}
          </p>
          <p className="text-sm font-light w-full text-ellipsis overflow-hidden whitespace-nowrap">{`${
            props.data.totalCourse || 0
          } khoá học`}</p>
          <p className="text-sm font-light w-full text-ellipsis overflow-hidden whitespace-nowrap">{`${
            props.data.totalStudent || 0
          } người học`}</p>
        </div>
      </div>
      <div className="flex justify-between w-full gap-4">
        <Link
          to={
            configRouter.teacherCategory.slice(0, -3) +
            `${props.data.teacher_id}`
          }
          className="w-full"
        >
          <div className="text-sm font-normal px-2 py-2.5 rounded-lg bg-blue-300 text-white w-full flex items-center justify-center">
            Xem chi tiết
          </div>
        </Link>
        <div className=" flex items-center justify-center rounded-md bg-gray-300/50 p-2">
          <EnvelopeSimpleOpen size={24} />
        </div>
        <div className=" flex items-center justify-center rounded-md bg-gray-300/50 p-2">
          <DotsThreeOutlineVertical size={24} />
        </div>
      </div>
    </div>
  );
};

export default TeacherItem;
