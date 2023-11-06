import { Cake, CaretRight, Check, Info, X } from "@phosphor-icons/react";
import React, { Dispatch, SetStateAction } from "react";

// create data sample for quiz with 2 type is single choice and multiple choice
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

const QuizList = () => {
  const array = [];
  for (let index = 0; index < 50; index++) {
    array.push(index);
  }
  return (
    <div className="w-[35vw] left-50 top-0  absolute  bg-white p-2 border  border-gray-400 mx-auto">
      <p className="font-bold my-5">Tất cả câu hỏi</p>
      <div
        className={"grid pl-8 py-5 gap-4 grid-cols-5 h-[45vh] overflow-auto"}
      >
        {array.map((item) => {
          return (
            <div className="bg-gray-400/60 shadow-lg w-12 h-12 flex justify-center cursor-pointer text-sm font-bold items-center hover:bg-blue-500/90 hover:text-white  rounded-full">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const QuizCompleted = () => {
  return (
    <div className="text-center flex bg-[#151c3b] w-full items-center justify-center flex-col gap-1 h-[500px]">
      <h1 className=" text-white">Quiz Scorecard</h1>
      <div className="w-[55%] h-40 rounded-md bg-[#111730] flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl text-green-400 font-extrabold ">100%</h1>
        <div className="flex items-center gap-1">
          <Cake size={20} color="white" />{" "}
          <p className="text-sm text-white">Great Job</p>
        </div>
      </div>
      <div className="flex gap-1 w-[55%] font-bold text-white">
        <div className="w-[100%] h-14 rounded-md bg-green-800/60 flex justify-between items-center p-5">
          <Check size={20} color="green" />
          <p>0</p>
        </div>
        <div className="w-[100%] h-14 rounded-md bg-red-800/60 flex justify-between items-center p-5">
          <X size={20} color="red" />
          <p>0</p>
        </div>
      </div>
      <button className="w-[55%] bg-[#6300df] rounded-sm text-white text-sm p-1 mt-10">
        Xác nhận
      </button>
      <button className="w-[55%] bg-[#151c39] rounded-sm text-white text-sm border-[2px] border-gray-100 p-1 mt-10">
        Xem lại bài làm
      </button>
    </div>
  );
};
interface QuizProps {
  setIsFullQuiz: Dispatch<SetStateAction<boolean>>;
}
const Quiz = ({ setIsFullQuiz }: QuizProps) => {
  const hour = 0;
  const minutes = 10;
  const seconds = 0;
  const [time, setTime] = React.useState({
    hour,
    minutes,
    seconds,
  });
  const countdown = () => {
    if (time.seconds > 0) {
      setTime({
        ...time,
        seconds: time.seconds - 1,
      });
    }
    if (time.seconds === 0) {
      if (time.minutes === 0) {
        if (time.hour === 0) {
          return;
        } else {
          setTime({
            hour: time.hour - 1,
            minutes: 59,
            seconds: 59,
          });
        }
      } else {
        setTime({
          ...time,
          minutes: time.minutes - 1,
          seconds: 59,
        });
      }
    }
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      countdown();
    }, 1000);
    return () => clearTimeout(timer);
  });

  const [currentQuestion, setCurrentQuestion] = React.useState(data[0]);
  const [QuizComplete, setQuizComplete] = React.useState(false);
  const [openQuizList, setOpenQuizList] = React.useState(false);
  return (
    <div className="bg-gray-500 flex justify-center  ">
      {!QuizComplete && (
        <div className="h-11/12 w-11/12 bg-white p-5 ">
          <div className="flex justify-between ">
            <div className="flex cursor-pointer h-10 relative items-center gap-2 text-sm rounded-lg bg-gray-50 p-3 border-2 border-gray-300">
              <Info
                onClick={() => {
                  setOpenQuizList(!openQuizList);
                }}
                size={20}
              />
              <p
                onClick={() => {
                  setOpenQuizList(!openQuizList);
                }}
              >
                Question No.5 of 10
              </p>
              {openQuizList && <QuizList />}
            </div>
            <div className="flex">
              <div className=" h-10  flex text-center font-bold text-sm  border-gray-300">
                <div className="w-29 h-full border-2 p-2 rounded-full border-gray-300">
                  <p>
                    {time.hour < 10 ? "0" + time.hour : time.hour} :{" "}
                    {time.minutes < 10 ? "0" + time.minutes : time.minutes} :{" "}
                    {time.seconds < 10 ? "0" + time.seconds : time.seconds}
                  </p>
                </div>
              </div>
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

          <div className="flex justify-between">
            <p
              className="p-4 text-sm cursor-pointer text-gray-600"
              onClick={() => {
                setIsFullQuiz(true);
              }}
            >
              Hiển thị toàn bộ
            </p>
            <button
              type="button"
              onClick={() => {
                if (currentQuestion.id == data.length) setQuizComplete(true);
                else setCurrentQuestion(data[currentQuestion.id]);
              }}
              className="text-white flex gap-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2"
            >
              Next
              <CaretRight size={16} />
            </button>
          </div>
        </div>
      )}
      {QuizComplete && <QuizCompleted />}
    </div>
  );
};

export default Quiz;
