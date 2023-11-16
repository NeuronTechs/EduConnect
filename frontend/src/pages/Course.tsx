import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
import Quiz from "@/components/Course/Quiz";
import FullQuiz from "@/components/Course/FullQuiz";
import Header from "@/components/Course/Header/Header";
const Course = () => {
  const { id } = useParams();
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullQuiz, setIsFullQuiz] = useState(false);
  useEffect(() => {
    if (id !== undefined)
      dispatch(
        getCourseDetails({ id: id, user_id: currentUser.currentUser?.user_id })
      );
  }, [dispatch, id]);

  return (
    <div>
      <Header />
      <div className="flex flex-col w-full  gap-5 overflow-y-hidden">
        <div className=" grid grid-cols-4 space-x-2 overflow-y-hidden relative">
          <div className="col-span-4 lg:col-span-3 w-full h-auto lg:h-[100vh] lg:overflow-y-auto scrollbar-hide ">
            {currentCourse.currentLecture?.type === "video" ? (
              <Video
                currentLecture={currentCourse.currentLecture}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
              />
            ) : isFullQuiz ? (
              <FullQuiz />
            ) : (
              <Quiz setIsFullQuiz={setIsFullQuiz} />
            )}

            <TabsInfo
              currentLecture={currentCourse.currentLecture}
              setCurrentTime={setCurrentTime}
              currentTime={currentTime}
            />
          </div>
          <Modules currentCourse={currentCourse.currentCourse} />
        </div>
      </div>
    </div>
  );
};

export default Course;
