import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import React from "react";
import { useParams } from "react-router-dom";
const Course = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col w-full  py-2 gap-5 ">
      <div className="flex items-center justify-start gap-5 w-full shadow-sm bg-white py-2 px-2 rounded-sm">
        <div className="text-blue-500 text-sm font-semibold p-2">Trang Chủ</div>
        <div className="text-blue-500 text-sm font-semibold p-2">Khóa Học</div>
        <div className="text-blue-500 text-sm font-semibold p-2">Tiêu đề</div>
      </div>
      <div className="grid  grid-cols-4 space-x-2 ">
        <div className="col-span-3">
          <Video />
          <TabsInfo />
        </div>
        <Modules />
      </div>
    </div>
  );
};

export default Course;
