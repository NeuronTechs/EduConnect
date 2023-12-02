import { useSelector } from "react-redux";
import assets from "../../assets";
import quizApi from "@/api/quizApi";
import { IQuiz, SliceState } from "@/types/type";
import { useEffect, useState } from "react";
const Task = () => {
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz[]>([]);
  const getQuiz = async () => {
    try {
      if (currentUser.currentUser) {
        setLoading(true);

        const res = await quizApi.getQuizNotExpired(
          currentUser.currentUser?.user_id
        );

        if (res.status === 200) {
          setLoading(false);
          setQuiz(res.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="m-2">
      <div className="flex justify-between text-sm">
        <strong> Bài tập tới hạn</strong>
        <button className="text-blue-gray-400 underline">Xem tất cả</button>
      </div>
      {quiz.map((item) => {
        return (
          <div className="mt-6 flex text-sm space-x-4 mb-6">
            <div className="avatar-account ">
              <img
                src={assets.images.task}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
            </div>
            <div>
              <p>{item.name}</p>
              <div className="text-gray-600">{item.timeout}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Task;
