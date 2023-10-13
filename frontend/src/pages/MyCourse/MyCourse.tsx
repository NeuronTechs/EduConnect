import React from "react";
import Card from "../../components/MyCourse/Card";
import assets from "../../assets";
import Calendar from "../../components/MyCourse/Calendar";
import Task from "../../components/MyCourse/Task";
import ListCourse from "@/components/MyCourse/ListCourse";
import { dataCourse } from "@/types/constans";

const MyCourse = () => {
  return (
    <div className="flex flex-col w-full px-2 py-2 gap-5">
      <div className="flex items-center justify-start gap-5 w-full shadow-sm bg-white py-2 px-2 rounded-sm">
        <div className="text-blue-500 text-sm font-semibold p-2">Trang Chủ</div>
        <div className="text-blue-500 text-sm font-semibold p-2">
          Khóa Học của tôi
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full  xl:w-[80%] gap-10 font-bold">
          <img
            src={assets.images.backgroundLogin}
            alt=""
            className="w-[99%] h-[200px] object-fill "
          />
          <div>
            <strong> Các khóa học gần đây</strong>
            <ListCourse isLoading={false} data={dataCourse} />
          </div>
          <div>
            <div className="mb-5">
              <strong> Các khóa học của bạn</strong>
              <ListCourse isLoading={false} data={dataCourse} />
            </div>
          </div>
        </div>
        <div className="w-[20%] hidden xl:block ">
          <Calendar />
          <Task />
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
