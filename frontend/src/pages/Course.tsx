import TabsInfo from "@/components/Course/Tabs";
import Modules from "@/components/Course/Modules";
import Video from "@/components/Course/Video";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails, selectQuiz } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
import Quiz from "@/components/Course/Quiz";
import Header from "@/components/Course/Header/Header";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
const Course = () => {
  const { id, quiz } = useParams();

  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();
  const getCourseDetailsStatus = async () => {
    if (
      id !== undefined &&
      currentUser.currentUser?.role &&
      (currentUser.currentUser?.user_id ||
        currentUser.currentUser?.role === "2")
    ) {
      const res = await dispatch(
        getCourseDetails({
          id: id,
          user_id: currentUser.currentUser?.user_id || "0",
          role: currentUser.currentUser?.role,
        })
      );
      console.log(res);

      if (res.payload === undefined) {
        navigate("/404");
      } else {
        if (quiz !== undefined) {
          dispatch(selectQuiz(quiz));
        }
      }
    }
  };
  useEffect(() => {
    getCourseDetailsStatus();
  }, [id]);

  return (
    <div>
      {currentCourse.loading ? (
        <LoadingPage />
      ) : (
        <div>
          <Header currentCourse={currentCourse.currentCourse} />
          <div className="flex flex-col w-full  gap-5 overflow-y-hidden">
            <div className=" grid grid-cols-4 space-x-2 overflow-y-hidden relative">
              <div className="col-span-4 lg:col-span-3 w-full h-auto lg:h-[100vh] lg:overflow-y-auto scrollbar-hide ">
                {currentCourse.currentLecture?.type === "video" &&
                  currentCourse.currentCourse && (
                    <Video
                      currentLecture={currentCourse.currentLecture}
                      currentTime={currentTime}
                      setCurrentTime={setCurrentTime}
                      currentCourse={currentCourse.currentCourse}
                    />
                  )}
                {currentCourse.currentLecture?.type === "quiz" &&
                  currentCourse.currentCourse && (
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
      )}
    </div>
  );
};

export default Course;
