import { createQuizResult, getQuiz, getResults } from "@/api/quizApi";
import { IAnswer, ILecture, IQuestion, IQuiz, SliceState } from "@/types/type";
import { CaretRight, Info } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import QuizSingleChoice from "./QuizSingleChoice";
import QuizMutiChoice from "./QuizMutiChoice";
import QuizFill from "./QuizFill";
import FullQuiz from "./FullQuiz";
import { useSelector } from "react-redux";
import QuizCompleted from "./QuizComplete";
import QuizList from "./QuizList";
import QuizStart from "./QuizStart";

interface QuizProps {
  currentLecture: ILecture | null;
}

export interface answer {
  type: string;
  index: number;
  answer: IAnswer[];
}
interface IQuizResult {
  student_id: string;
  quiz_id: string;
  answer: answer[];
  score: string;
  IsPass: string;
}
const Quiz = ({ currentLecture }: QuizProps) => {
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const [time, setTime] = React.useState(0);
  const [quiz, setQuiz] = React.useState<IQuiz>(); // quiz data
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0); // current question index
  const [currentQuestion, setCurrentQuestion] = React.useState<IQuestion>();
  const [QuizComplete, setQuizComplete] = React.useState(false);
  const [openQuizList, setOpenQuizList] = React.useState(false);
  const [answerList, setAnswerList] = React.useState<answer[]>([]);
  const [isFullQuiz, setIsFullQuiz] = React.useState(false);
  const [startQuiz, setStartQuiz] = React.useState(false); // quiz start or not
  const [error, setError] = React.useState("");
  const [scoreQuiz, setScore] = React.useState(0);
  const [review, setReview] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const countdown = () => {
    if (time === 0) handleComplete();
    if (time > 0) setTime(time - 1);
  };
  React.useEffect(() => {
    if (QuizComplete === false && review === false && startQuiz) {
      const timer = setTimeout(() => {
        countdown();
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const getData = async () => {
    setLoading(true);
    setReview(false);
    setQuizComplete(false);
    if (currentLecture && currentUser.currentUser) {
      const res: IQuiz = await getQuiz(currentLecture?.lecture_id);
      if (res) {
        setTime(res.duration);
        setQuiz(res);
        const res1: IQuizResult = await getResults(
          currentUser.currentUser.user_id,
          res.quiz_id
        );

        if (res1) {
          setQuizComplete(true);
          setScore(parseInt(res1.score));
          setAnswerList(res1.answer);
          setCurrentQuestion(res.questions[0]);

          if (parseInt(res1.IsPass) === 1) setReview(true);
          else {
            const array: answer[] = [];
            for (let index = 0; index < res.questions.length; index++) {
              array.push({
                type: res.questions[index].type,
                index: index,
                answer: [],
              });
            }
            setAnswerList(array);
          }
        } else {
          setCurrentQuestion(res.questions[0]);
          if (res) {
            const array: answer[] = [];
            for (let index = 0; index < res.questions.length; index++) {
              array.push({
                type: res.questions[index].type,
                index: index,
                answer: [],
              });
            }
            setAnswerList(array);
          } else {
            setAnswerList([]);
          }
        }
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (currentLecture?.type === "quiz") {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLecture]);
  const handleComplete = async () => {
    if (quiz) {
      let score = 0;
      for (let i = 0; i < quiz.questions.length; i++) {
        if (answerList[i].answer.length === 0) {
          setError("Bạn chưa hoàn thành bài kiểm tra");
          return;
        }
      }
      for (let index = 0; index < answerList.length; index++) {
        if (quiz.questions[index].type === "single_choice") {
          if (
            answerList[index].answer[0].isCorrect === 1 &&
            answerList[index].answer.length === 1
          ) {
            score++;
          }
        } else if (quiz.questions[index].type === "fill") {
          if (
            answerList[index].answer[0].answer ===
            quiz.questions[index].answers[0].answer
          ) {
            score++;
          }
        } else if (quiz.questions[index].type === "multiple_choice") {
          let count1 = 0;
          let count2 = 0;
          for (let i = 0; i < answerList[index].answer.length; i++) {
            if (answerList[index].answer[i].isCorrect === 1) {
              count1++;
            }
            if (quiz.questions[index].answers[i].isCorrect === 1) {
              count2++;
            }
          }
          if (count1 === count2) {
            score++;
          }
        }
      }
      if (currentUser.currentUser && quiz) {
        const pass =
          (score / quiz.questions.length) * 100 >= quiz.passPercent
            ? true
            : false;

        const result = await createQuizResult(
          currentUser.currentUser?.user_id,
          quiz.quiz_id,
          answerList,
          score.toString(),
          pass
        );
        if (result && !result.response) {
          setQuizComplete(true);
          setScore(score);
          setCurrentQuestionIndex(0);
          if (pass) setReview(true);
        }
        setError("");
      }
    }
  };
  function formatTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  }
  console.log(quiz);

  return (
    <>
      {loading ? (
        <div className="bg-gray-500 h-[75vh]  flex justify-center items-center  ">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-gray-500 h-[75vh]  flex justify-center  ">
          {startQuiz === false &&
          review === false &&
          QuizComplete === false &&
          quiz ? (
            <QuizStart setStartQuiz={setStartQuiz} quiz={quiz} />
          ) : isFullQuiz && quiz ? (
            <FullQuiz
              review={review}
              currentQuiz={quiz}
              answerList={answerList}
              setAnswerList={setAnswerList}
              handleComplete={handleComplete}
              setIsFullQuiz={setIsFullQuiz}
              error={error}
            />
          ) : (
            !QuizComplete && (
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
                      Câu hỏi thứ {currentQuestionIndex + 1} /{" "}
                      {quiz?.questions.length}
                    </p>
                    {openQuizList && quiz && (
                      <QuizList
                        quiz={quiz}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        setCurrentQuestion={setCurrentQuestion}
                        setOpenQuizList={setOpenQuizList}
                        answerList={answerList}
                      />
                    )}
                  </div>
                  <div className="flex">
                    <div className=" h-10  flex text-center font-bold text-sm  border-gray-300">
                      <div className="w-29 h-full border-2 p-2 rounded-full border-gray-300">
                        <p>{formatTime(time)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-sm my-5 shadow-gray-700 w-full border-y-2 justify-between border-gray-300 h-10 p-3 flex items-center">
                  <h3 className="text-base font-bold">
                    {currentQuestion?.question}
                  </h3>
                  <h3 className="text-base font-bold text-red-500">{error}</h3>
                </div>
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
                    {currentQuestion &&
                    currentQuestion.type === "single_choice" ? (
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

                <div className="flex justify-between">
                  <p
                    className="p-4 text-sm cursor-pointer text-gray-600"
                    onClick={() => {
                      setIsFullQuiz(true);
                    }}
                  >
                    Hiển thị toàn bộ
                  </p>
                  <div className="flex gap-4">
                    {quiz &&
                      currentQuestionIndex !== quiz?.questions.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              quiz &&
                              currentQuestionIndex < quiz.questions.length - 1
                            ) {
                              setCurrentQuestionIndex(currentQuestionIndex + 1);
                              setCurrentQuestion(
                                quiz.questions[currentQuestionIndex + 1]
                              );
                            }
                            // if (currentQuestion.id == data.length) setQuizComplete(true);
                            // else setCurrentQuestion(data[currentQuestion.id]);
                          }}
                          className="text-white flex gap-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2"
                        >
                          Next
                          <CaretRight size={16} />
                        </button>
                      )}
                    {quiz &&
                      currentQuestionIndex === quiz?.questions.length - 1 &&
                      QuizComplete === false && (
                        <button
                          onClick={() => {
                            if (review) setQuizComplete(true);
                            else handleComplete();
                          }}
                          className="text-white flex gap-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2"
                        >
                          Finish
                          <CaretRight size={16} />
                        </button>
                      )}
                  </div>
                </div>
              </div>
            )
          )}
          {QuizComplete && quiz && (
            <QuizCompleted
              scoreQuiz={scoreQuiz}
              quiz={quiz}
              setQuizComplete={setQuizComplete}
              review={review}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
