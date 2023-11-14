import React from "react";
import { Rating } from "@material-tailwind/react";
import {
  ArrowRight,
  FolderPlus,
  SealCheck,
  UsersThree,
} from "@phosphor-icons/react";
import { ICourseOverview } from "../types/type";
import { Link } from "react-router-dom";
import ImageWithError from "./ImageWithError";
import assets from "@/assets";

function RatedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        d="M9 13.3275L13.635 16.125L12.405 10.8525L16.5 7.305L11.1075 6.8475L9 1.875L6.8925 6.8475L1.5 7.305L5.595 10.8525L4.365 16.125L9 13.3275Z"
        fill="#FACC15"
      />
    </svg>
  );
}

function UnratedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={0.1}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        d="M16.5 7.305L11.1075 6.84L9 1.875L6.8925 6.8475L1.5 7.305L5.595 10.8525L4.365 16.125L9 13.3275L13.635 16.125L12.4125 10.8525L16.5 7.305ZM9 11.925L6.18 13.6275L6.93 10.4175L4.44 8.2575L7.725 7.9725L9 4.95L10.2825 7.98L13.5675 8.265L11.0775 10.425L11.8275 13.635L9 11.925Z"
        fill="black"
        fillOpacity="0.23"
      />
    </svg>
  );
}

interface props {
  data: ICourseOverview;
}
const Course = (props: props): React.ReactElement => {
  return (
    <div className="rounded-2xl bg-white p-2 flex flex-col gap-2 shadow-sm w-full">
      <div className="w-full aspect-video h-full max-h-[200px] min-h-[150px]">
        <ImageWithError
          src={props.data.image}
          alt={props.data.title}
          fallbackSrc={assets.images.bgCourse}
          className="w-full h-full object-fill rounded-2xl"
        />
      </div>
      <div className="card-content px-1 space-y-2 mb-2">
        {/* content */}
        <div className="w-full flex justify-between gap-2">
          <div className="flex flex-auto flex-col overflow-hidden">
            <h5 className="xl:text-lg lg:text-base md:text-sm font-semibold text-black  w-full whitespace-nowrap text-ellipsis">
              {props.data.title}
            </h5>
            <p className="text-xs font-normal text-gray-600">
              {props.data.user?.full_name}
            </p>
          </div>
          <div className="rounded-full md:h-[40px] md:w-[40px] h-[30px] w-[30px] overflow-hidden">
            <ImageWithError
              src={props.data.user?.avatar}
              alt={props.data.user?.full_name}
              fallbackSrc={assets.images.noAvatar}
              className="w-full h-full object-cover bg-gray-500"
            />
            {/* <img
              src={props.data.user?.avatar}
              alt={props.data.user?.full_name}
              className="w-full h-full object-cover"
            /> */}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* rating */}
          <div className="w-full flex justify-between flex-col gap-3">
            <div className="flex gap-1 items-center">
              <Rating
                value={props.data?.ranking || 0}
                readonly
                ratedIcon={<RatedIcon />}
                unratedIcon={<UnratedIcon />}
              />
              <p className="text-xs font-medium">{props.data?.ranking || 0}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-black font-extralight">
                {`${props.data.price} VND`}
              </p>
              <p className="text-xs text-gray-500 font-extralight line-through">
                {`${props.data.discount} VND`}
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
                {props.data?.total_lecture || 0}
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 ">
              <div>
                <SealCheck size={15} />
              </div>
              <p className="text-xs font-bold leading-3">
                {/* check out */}
                {props.data?.total_enrollment || 0}
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 ">
              <div>
                <UsersThree size={15} />
              </div>
              <p className="text-xs font-bold leading-3">
                {/* number student */}
                {props.data.total_student || 0}
              </p>
            </div>
          </div>
          {/* button */}
          <div className="flex w-full justify-end ">
            <Link to={`/course/${props.data.course_id}`}>
              <div className="flex gap-1 bg-blue-300 rounded-3xl items-center justify-center px-4 py-2 text-white">
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

export default Course;
