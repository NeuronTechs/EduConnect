import { IQuestion } from "@/types/type";
import { answer } from "./Quiz";

interface props {
  currentQuestion: IQuestion;
  answerList: answer[];
  currentQuestionIndex: number;
  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
}
const QuizSingleChoice = ({
  currentQuestion,
  answerList,
  currentQuestionIndex,
  setAnswerList,
}: props) => {
  return (
    <div>
      {currentQuestion.answers.map((answer, index) => {
        return (
          <div
            key={index}
            role="button"
            tabIndex={index}
            onClick={() => {
              const temp = [...answerList];
              temp[currentQuestionIndex].answer = [answer];
              setAnswerList(temp);
            }}
            className={
              answerList[currentQuestionIndex].answer.some(
                (a) => a.answer_id === answer.answer_id
              )
                ? "flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all  hover:bg-opacity-80 bg-blue-500 text-white focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80   active:text-blue-900 outline-none"
                : "flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900  active:text-blue-900 outline-none"
            }
          >
            {index + 1} . {answer.answer}
          </div>
        );
      })}
    </div>
  );
};

export default QuizSingleChoice;
