import React from "react";
import {
  DotsThreeOutlineVertical,
  EnvelopeSimpleOpen,
} from "@phosphor-icons/react";
import { ITeacher } from "../types/type";
import { Link } from "react-router-dom";
interface props {
  data: ITeacher;
}
const TeacherItem = (props: props): React.ReactElement => {
  return (
    <div className="bg-white rounded-xl p-2.5 space-y-5 w-full gap-2 py-2">
      <div className="flex gap-4 justify-center">
        <div className="w-50px">
          <img
            src={props.data.avatar}
            alt={props.data.name}
            className="rounded-full object-fill h-[50px] w-[50px]"
          />
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <h6 className="text-sm font-semibold">{props.data.name}</h6>
          <p className="text-sm font-light">{props.data.subject}</p>
          <p className="text-sm font-light">{`${props.data.totalCourse} khoá học`}</p>
          <p className="text-sm font-light">{`${props.data.totalStudent} người học`}</p>
        </div>
      </div>
      <div className="flex justify-between w-full gap-2">
        <Link to={`/teacher-category/${props.data.id}`}>
          <div className="text-sm font-normal px-2 py-2.5 rounded-lg bg-blue-300 text-white w-full flex items-center justify-center">
            Xem
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
