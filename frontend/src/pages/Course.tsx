import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
import Quiz from "@/components/Course/Quiz";
import FullQuiz from "@/components/Course/FullQuiz";
import Header from "@/components/Course/Header/Header";
import { login } from "@/features/auth/authSlice";
const Course = () => {
  const { id } = useParams();
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();
  const getCourseDetailsStatus = async () => {
    if (id !== undefined && currentUser.currentUser?.user_id) {
      const res = await dispatch(
        getCourseDetails({ id: id, user_id: currentUser.currentUser?.user_id })
      );
      console.log(res);
      if (res.payload === undefined) {
        navigate("/404");
      }
    }
  };
  useEffect(() => {
    getCourseDetailsStatus();
  }, [id]);

  return (
    <div>
      {/* {loading ? (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
          </div>
        </div>
      ) : ( */}
      <div>
        <Header currentCourse={currentCourse.currentCourse} />
        <div className="flex flex-col w-full  gap-5 overflow-y-hidden">
          <div className=" grid grid-cols-4 space-x-2 overflow-y-hidden relative">
            <div className="col-span-4 lg:col-span-3 w-full h-auto lg:h-[100vh] lg:overflow-y-auto scrollbar-hide ">
              {currentCourse.currentLecture?.type === "video" ? (
                <Video
                  currentLecture={currentCourse.currentLecture}
                  currentTime={currentTime}
                  setCurrentTime={setCurrentTime}
                />
              ) : (
                <Quiz currentLecture={currentCourse.currentLecture} />
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
      {/* )} */}
    </div>
  );
};

export default Course;
