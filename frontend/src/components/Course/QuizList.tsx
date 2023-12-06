import { IQuestion, IQuiz } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { answer } from "./Quiz";

const QuizList = ({
  quiz,
  setCurrentQuestionIndex,
  setCurrentQuestion,
  setOpenQuizList,
  answerList,
}: {
  quiz: IQuiz;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setCurrentQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
  setOpenQuizList: Dispatch<SetStateAction<boolean>>;
  answerList: answer[];
}) => {
  const array = [];
  for (let index = 0; index < quiz.questions.length; index++) {
    array.push(index);
  }
  return (
    <div className="w-[35vw] left-50 top-0  absolute  bg-white p-2 border  border-gray-400 mx-auto">
      <p className="font-bold my-5">Tất cả câu hỏi</p>
      <div className={"grid pl-8 py-5  grid-cols-5 h-[35vh] overflow-auto"}>
        {array.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setCurrentQuestion(quiz.questions[index]);
                setOpenQuizList(false);
              }}
              className={
                answerList[index].answer.length > 0
                  ? " shadow-lg w-12 h-12 flex justify-center cursor-pointer text-sm font-bold items-center bg-blue-500/90 text-white  rounded-full"
                  : "bg-gray-400/60 shadow-lg w-12 h-12 flex justify-center cursor-pointer text-sm font-bold items-center hover:bg-blue-500/90 hover:text-white  rounded-full"
              }
            >
              {item + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizList;
