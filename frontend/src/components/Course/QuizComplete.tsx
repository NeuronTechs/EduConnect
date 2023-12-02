import { IQuiz } from "@/types/type";
import { Cake, Check, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

const QuizCompleted = ({
  scoreQuiz,
  quiz,
  setQuizComplete,
}: {
  scoreQuiz: number;
  quiz: IQuiz;
  setQuizComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="text-center flex bg-[#151c3b] w-full items-center justify-center flex-col gap-1 h-[500px]">
      <h1 className=" text-white">Quiz Scorecard</h1>
      <div className="w-[55%] h-40 rounded-md bg-[#111730] flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl text-green-400 font-extrabold ">
          {((scoreQuiz / quiz.questions.length) * 100).toFixed(2)}%
        </h1>
        <div className="flex items-center gap-1">
          <Cake size={20} color="white" />{" "}
          <p className="text-sm text-white">Great Job</p>
        </div>
      </div>
      <div className="flex gap-1 w-[55%] font-bold text-white">
        <div className="w-[100%] h-14 rounded-md bg-green-800/60 flex justify-between items-center p-5">
          <Check size={20} color="green" />
          <p>{scoreQuiz}</p>
        </div>
        <div className="w-[100%] h-14 rounded-md bg-red-800/60 flex justify-between items-center p-5">
          <X size={20} color="red" />
          <p>{quiz.questions.length}</p>
        </div>
      </div>

      <button
        onClick={() => {
          setQuizComplete(false);
        }}
        className="w-[55%] bg-[#151c39] rounded-sm text-white text-sm border-[2px] border-gray-100 p-1 mt-10"
      >
        Xem lại bài làm
      </button>
    </div>
  );
};

export default QuizCompleted;
