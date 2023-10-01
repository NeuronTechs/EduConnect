import React from "react";
import Card from "../components/MyCourse/Card";
import assets from "../assets";
import Calendar from "../components/MyCourse/Calendar";
import Task from "../components/MyCourse/Task";

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
        <div className="flex flex-col w-[80%] gap-10">
          <img
            src={assets.images.backgroundLogin}
            alt=""
            className="w-[99%] h-[200px] object-fill "
          />
          <div>
            <strong> Your Recent</strong>
            <div className="grid grid-cols-4 ">
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
          <div>
            <div>
              <strong> Your Course</strong>
              <div className="grid grid-cols-4 ">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] ">
          <Calendar />
          <Task />
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
