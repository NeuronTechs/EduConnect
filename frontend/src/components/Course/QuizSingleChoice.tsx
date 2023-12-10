import { IQuestion } from "@/types/type";
import { answer } from "./Quiz";

interface props {
  review?: boolean;
  currentQuestion: IQuestion;
  answerList: answer[];
  currentQuestionIndex: number;
  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
}
const QuizSingleChoice = ({
  review,
  currentQuestion,
  answerList,
  currentQuestionIndex,
  setAnswerList,
}: props) => {
  return (
    <div>
      {currentQuestion.answers.map((answer, index) => {
        const isCorrect = answer.isCorrect === 1;
        const showCorrect = review && isCorrect;
        const isSelected = answerList[currentQuestionIndex].answer.some(
          (a) => a.answer_id === answer.answer_id
        );
        return (
          <div
            key={index}
            role="button"
            tabIndex={index}
            onClick={() => {
              if (!review) {
                const temp = [...answerList];
                temp[currentQuestionIndex].answer = [answer];
                setAnswerList(temp);
              }
            }}
            className={`flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all outline-none ${
              isSelected
                ? showCorrect
                  ? "bg-green-500 text-white hover:bg-green-500 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 hover:text-green-900 active:bg-blue-50 active:bg-opacity-80 active:text-green-900"
                  : "bg-red-500 text-white hover:bg-red-500 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 hover:text-red-900 active:bg-blue-50 active:bg-opacity-80 active:text-red-900"
                : showCorrect
                ? "bg-green-500 text-white hover:bg-green-500 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 hover:text-green-900 active:bg-blue-50 active:bg-opacity-80 active:text-green-900"
                : "hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 hover:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900"
            }`}
          >
            {index + 1} . {answer.answer}
          </div>
        );
      })}
    </div>
  );
};

export default QuizSingleChoice;
