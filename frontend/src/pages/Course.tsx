import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
const Course = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  console.log(currentCourse);

  useEffect(() => {
    if (id !== undefined) dispatch(getCourseDetails(id));
  }, [dispatch, id]);
  return (
    <div className="flex flex-col w-full  py-2 gap-5 ">
      <div className=" grid grid-cols-4 space-x-2 ">
        <div className="col-span-4 lg:col-span-3 h-auto lg:h-screen lg:overflow-y-auto scrollbar-hide">
          <Video currentLecture={currentCourse.currentLecture} />
          <TabsInfo currentLecture={currentCourse.currentLecture} />
        </div>
        <Modules currentCourse={currentCourse.currentCourse} />
      </div>
    </div>
  );
};

export default Course;
