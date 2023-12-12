import { IQuestion, IQuiz } from "@/types/type";
import { CaretRight, Info } from "@phosphor-icons/react";
import QuizFill from "./QuizFill";
import QuizSingleChoice from "./QuizSingleChoice";
import QuizMutiChoice from "./QuizMutiChoice";
import { answer } from "./Quiz";

interface quizProps {
  review?: boolean;
  currentQuestion: IQuestion;
  currentQuestionIndex: number;
  answerList: answer[];
  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
}

const Quiz = ({
  review,
  currentQuestion,
  currentQuestionIndex,
  answerList,
  setAnswerList,
}: quizProps) => {
  return (
    <div className="h-11/12 w-11/12 bg-white p-5 ">
      <div className="flex justify-between ">
        <div className="flex h-10 items-center gap-2 text-sm rounded-lg bg-gray-50 p-3 border-2 border-gray-300">
          <Info size={20} />
          Câu hỏi thứ {currentQuestionIndex + 1}
        </div>
      </div>
      <div className="shadow-sm my-5 shadow-gray-700 w-full border-y-2 border-gray-300 h-10 p-3 flex items-center">
        <h3 className="text-base font-bold">{currentQuestion.question}</h3>
      </div>
      <h6 className="text-sm font-normal">
        Please choose one of the following answers:
      </h6>
      <div className="border-[0.5px] rounded-md m-5 text-sm font-medium border-gray-300  ">
        {currentQuestion && currentQuestion.type === "fill" ? (
          <QuizFill
            review={review}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            answerList={answerList}
            setAnswerList={setAnswerList}
          />
        ) : (
          <div className="border-[0.5px] rounded-md m-5 text-sm font-medium border-gray-300  ">
            {currentQuestion && currentQuestion.type === "single_choice" ? (
              <QuizSingleChoice
                review={review}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                answerList={answerList}
                setAnswerList={setAnswerList}
              />
            ) : (
              currentQuestion &&
              currentQuestion.type === "multiple_choice" && (
                <QuizMutiChoice
                  review={review}
                  currentQuestion={currentQuestion}
                  currentQuestionIndex={currentQuestionIndex}
                  answerList={answerList}
                  setAnswerList={setAnswerList}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
interface QuizProps {
  review?: boolean;
  currentQuiz: IQuiz;
  answerList: answer[];
  setAnswerList: React.Dispatch<React.SetStateAction<answer[]>>;
  handleComplete: () => void;
  setIsFullQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
}
const FullQuiz = ({
  review,
  currentQuiz,
  answerList,
  setAnswerList,
  handleComplete,
  setIsFullQuiz,
  error,
}: QuizProps) => {
  return (
    <div className=" w-full h-screen flex justify-center  ">
      <div className="h-[500px] overflow-auto w-11/12 bg-white p-5 ">
        <div className="flex justify-end">
          <p
            className="p-4 text-sm cursor-pointer text-gray-600"
            onClick={() => {
              setIsFullQuiz(false);
            }}
          >
            Quay lại danh sách câu hỏi
          </p>
        </div>
        {currentQuiz.questions.map((question, index) => {
          return (
            <Quiz
              review={review}
              currentQuestion={question}
              currentQuestionIndex={index}
              answerList={answerList}
              setAnswerList={setAnswerList}
            />
          );
        })}
        <div className={error ? "flex justify-between" : "flex justify-end"}>
          {error && (
            <div className="bg-red-500 text-white p-2 h-10 rounded-md text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleComplete}
            className="text-white   flex gap-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2"
          >
            Finish
            <CaretRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullQuiz;
