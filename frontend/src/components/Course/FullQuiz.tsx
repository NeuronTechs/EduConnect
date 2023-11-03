import { Info } from "@phosphor-icons/react";
import React from "react";
const data = [
  {
    id: 1,
    question: "What frame do we need to create a web ...",
    type: "single",
    answers: [
      {
        id: 1,
        answer: "Tablet",
        isCorrect: false,
      },
      {
        id: 2,
        answer: "Presentation",
        isCorrect: false,
      },
      {
        id: 3,
        answer: "Desktop",
        isCorrect: false,
      },
      {
        id: 4,
        answer: "Paper",
        isCorrect: true,
      },
    ],
  },
  {
    id: 2,
    question:
      "What is the name of the process that sends one of information using two bit of classical information?",
    type: "multiple",
    answers: [
      {
        id: 1,
        answer: "Đề xuất món ăn",
        isCorrect: false,
      },
      {
        id: 2,
        answer: "Đề xuất món ăn",
        isCorrect: false,
      },
      {
        id: 3,
        answer: "Đề xuất món ăn",
        isCorrect: false,
      },
      {
        id: 4,
        answer: "Đề xuất món ăn",
        isCorrect: true,
      },
    ],
  },
];
interface QuizProps {
  currentQuestion: {
    id: number;
    question: string;
    type: string;
    answers: {
      id: number;
      answer: string;
      isCorrect: boolean;
    }[];
  };
}
const Quiz = ({ currentQuestion }: QuizProps) => {
  return (
    <div className="h-11/12 w-11/12 bg-white p-5 ">
      <div className="flex justify-between ">
        <div className="flex h-10 items-center gap-2 text-sm rounded-lg bg-gray-50 p-3 border-2 border-gray-300">
          <Info size={20} />
          Question No.5 of 10
        </div>
      </div>
      <div className="shadow-sm my-5 shadow-gray-700 w-full border-y-2 border-gray-300 h-10 p-3 flex items-center">
        <h3 className="text-base font-bold">{currentQuestion.question}</h3>
      </div>
      <h6 className="text-sm font-normal">
        Please choose one of the following answers:
      </h6>
      <div className="border-[0.5px] rounded-md m-5 text-sm font-medium border-gray-300  ">
        {currentQuestion.type === "single"
          ? currentQuestion.answers.map((answer, index) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900  active:text-blue-900 outline-none"
                >
                  {index + 1} . {answer.answer}
                </div>
              );
            })
          : currentQuestion.answers.map((answer, index) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center border-b-[0.5px] border-gray-300 first-letter: h-12 w-full p-3 rounded-sm text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-500 focus:text-white focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900  active:text-blue-900 outline-none"
                >
                  <input
                    id={"bordered-checkbox-" + index}
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
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
    </div>
  );
};
const FullQuiz = () => {
  return (
    <div className="bg-gray-500 flex justify-center py-5">
      <div className="h-[500px] overflow-auto w-11/12 bg-white p-5 ">
        {data.map((question) => {
          return <Quiz currentQuestion={question} />;
        })}
      </div>
    </div>
  );
};

export default FullQuiz;
