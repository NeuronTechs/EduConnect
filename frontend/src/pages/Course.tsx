import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import React from "react";
import { useParams } from "react-router-dom";
const Course = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col w-full  py-2 gap-5 ">
      <div className=" grid grid-cols-4 space-x-2 ">
        <div className="col-span-4 lg:col-span-3 h-auto lg:h-screen lg:overflow-y-auto scrollbar-hide">
          <Video />
          <TabsInfo />
        </div>
        <Modules />
      </div>
    </div>
  );
};

export default Course;
