import { useSelector } from "react-redux";
import assets from "../../assets";
import quizApi from "@/api/quizApi";
import { IQuiz, SliceState } from "@/types/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Task = () => {
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<IQuiz[]>([]);
  const getQuiz = async () => {
    try {
      if (currentUser.currentUser) {
        // setLoading(true);

        const res = await quizApi.getQuizNotExpired(
          currentUser.currentUser?.user_id
        );

        if (res.status === 200) {
          // setLoading(false);
          setQuiz(res.data);
        }
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);
  const convertTime = (time: string | undefined) => {
    if (time !== undefined) {
      const date = new Date(time);

      const formattedDate = date.toLocaleString("en-US");
      return formattedDate;
    }
  };
  const navigateToCourse = (quiz: IQuiz) => {
    navigate("/course/learn/" + quiz.course_id + "/" + quiz.lecture_id);
  };
  return (
    <div className="m-2">
      <div className="flex justify-between text-sm">
        <strong> Bài tập tới hạn</strong>
      </div>
      {quiz.length > 0 ? (
        quiz.map((item) => {
          return (
            <div className="mt-6 flex text-sm space-x-4 mb-6 ">
              <div className="avatar-account ">
                <img
                  src={assets.images.task}
                  alt="avatar"
                  className="rounded-full h-[40px] w-[40px]"
                />
              </div>
              <div>
                <p
                  className="cursor-pointer "
                  onClick={() => {
                    navigateToCourse(item);
                  }}
                >
                  {item.name}
                </p>
                <div className="text-gray-600">{convertTime(item.timeout)}</div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 p-5 text-base"> Chưa có bài tập nào</p>
      )}
    </div>
  );
};

export default Task;
