import { IAnswer, IQuestion } from "@/types/type";
import { answer } from "./Quiz";

interface props {
  currentQuestion: IQuestion;
  answerList: answer[];
  currentQuestionIndex: number;

  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
}
const QuizFill = ({
  answerList,
  currentQuestionIndex,
  setAnswerList,
}: props) => {
  return (
    <div>
      <div className="p-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Câu trả lời của bạn
        </label>
        <textarea
          id="message"
          rows={4}
          onChange={(e) => {
            const temp = [...answerList];
            const answerTemp: IAnswer = {
              answer_id: "",
              question_id: "",
              answer: "",
              image: "",
              question: "",
              isCorrect: 0,
              explain: "",
            };
            answerTemp.answer = e.target.value;
            temp[currentQuestionIndex].answer = [answerTemp];
            setAnswerList(temp);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Viết câu trả lời của bạn"
          defaultValue={""}
          value={answerList[currentQuestionIndex]?.answer[0]?.answer}
        />
      </div>
    </div>
  );
};

export default QuizFill;
