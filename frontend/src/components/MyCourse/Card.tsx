import { ICourse } from "@/types/type";
import { Book, ShieldCheck, UsersFour } from "@phosphor-icons/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type props = {
  data: ICourse;
};
const Card = (props: props) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl bg-white p-4  flex flex-col gap-4 shadow-xl w-[95%] h-[55vh] mb-5   ">
      <div className="w-full">
        <img
          src={
            props.data.image
              ? props.data.image
              : "https://foto.wuestenigel.com/wp-content/uploads/api/course-text-on-blackboard.jpeg"
          }
          alt=""
          className="w-full h-[25vh] object-fill rounded-xl"
        />
      </div>
      <div className="card-content px-1 space-y-2 mb-2 h-[65%]">
        {/* content */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h5
              className="text-[15px] font-bold text-black cursor-pointer"
              onClick={() => {
                navigate("/course/learn/" + props.data.course_id);
              }}
            >
              {props.data.title}
            </h5>
            <p className="text-sm font-normal text-gray-500 mt-2">
              {props.data.teacher_name}
            </p>
          </div>
          <div>
            <img
              className="rounded-full h-[35px] w-[35px]"
              src={props.data.teacher_avatar}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-gray-500 leading-3 text-base font-semibold">
        <div className="flex justify-center items-center">
          <Book size={15} className="mr-2" /> 1
        </div>
        <div className="flex justify-center items-center">
          <ShieldCheck size={15} className="mr-2" /> 2
        </div>
        <div className="flex justify-center items-center">
          <UsersFour size={15} className="mr-2" /> 3
        </div>
      </div>
      <div className="w-full bg-gray-300 rounded-lg h-1">
        <div
          className="bg-gray-600 h-1 p-0.5 text-center text-[15px] font-semibold leading-none text-primary-100 rounded-lg"
          style={{
            width:
              (props.data.completed_lectures !== undefined &&
              props.data.total_lectures !== undefined
                ? props.data.completed_lectures / props.data.total_lectures
                : 0) *
                100 +
              "%",
          }}
        ></div>
      </div>
      <div className="flex justify-between text-[13px] text-gray-500">
        <p>
          Hoàn Thành
          {"   " +
            parseFloat(
              (props.data.completed_lectures !== undefined &&
              props.data.total_lectures !== undefined
                ? props.data.completed_lectures / props.data.total_lectures
                : 0) *
                100 +
                "%"
            ).toFixed(2) +
            "%"}
        </p>
        <p>
          Bài học{" "}
          {props.data.completed_lectures + " / " + props.data.total_lectures}{" "}
        </p>
      </div>
    </div>
  );
};

export default Card;
