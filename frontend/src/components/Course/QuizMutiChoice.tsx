import { IQuestion } from "@/types/type";
import { answer } from "./Quiz";

interface props {
  currentQuestion: IQuestion;
  answerList: answer[];
  currentQuestionIndex: number;
  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
}
const QuizMutiChoice = ({
  currentQuestion,
  answerList,
  currentQuestionIndex,
  setAnswerList,
}: props) => {
  return (
    <div>
      {currentQuestion?.answers.map((answer, index) => {
        return (
          <div
            key={index}
            role="button"
            tabIndex={0}
            className="flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900  active:text-blue-900 outline-none"
          >
            <input
              id={"bordered-checkbox-" + index}
              type="checkbox"
              value=""
              name="bordered-checkbox"
              checked={answerList[currentQuestionIndex].answer.some(
                (a) => a.answer_id === answer.answer_id
              )}
              onClick={() => {
                const temp = [...answerList];
                if (temp[currentQuestionIndex].answer.includes(answer)) {
                  temp[currentQuestionIndex].answer.splice(
                    temp[currentQuestionIndex].answer.indexOf(answer),
                    1
                  );
                } else {
                  temp[currentQuestionIndex].answer.push(answer);
                }
                setAnswerList(temp);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label
              htmlFor={"bordered-checkbox-" + index}
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {answer.answer}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default QuizMutiChoice;
