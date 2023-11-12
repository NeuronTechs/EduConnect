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
    <div className="rounded-2xl bg-white p-2 flex flex-col gap-4 shadow-sm w-[90%] mb-5   ">
      <div className="w-full">
        <img
          src={props.data.image}
          alt=""
          className="w-full h-[100px] object-fill rounded-2xl"
        />
      </div>
      <div className="card-content px-1 space-y-2 mb-2">
        {/* content */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h5
              className="text-sm font-semibold text-black cursor-pointer"
              onClick={() => {
                navigate("/course/learn/" + props.data.course_id);
              }}
            >
              {props.data.title}
            </h5>
            <p className="text-xs font-normal text-gray-600">
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
      <div className="flex justify-between text-gray-500 leading-3 font-semibold">
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
          className="bg-gray-600 h-1 p-0.5 text-center text-[10px] font-light leading-none text-primary-100 rounded-lg"
          style={{
            width:
              (props.data.completed_lectures / props.data.total_lectures) *
                100 +
              "%",
          }}
        ></div>
      </div>
      <div className="flex justify-between text-[11px] text-gray-500">
        <h6>Complete 60%</h6>
        <h6>Days: 15/24</h6>
      </div>
    </div>
  );
};

export default Card;
