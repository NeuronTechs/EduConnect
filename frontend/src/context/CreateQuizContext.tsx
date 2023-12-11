import quizApi from "@/api/quizApi";
import { IAnswerInfo, IQuestionInfo, IQuizInfo } from "@/types/type";
import React from "react";
import { toast } from "react-toastify";

interface CreateQuizContextType {
  dataQuiz: IQuizInfo;
  setDataQuiz: React.Dispatch<React.SetStateAction<IQuizInfo>>;
  handleChangeQuiz: (quiz: IQuizInfo) => void;
  // question
  handleAddNewQuestion: (question: IQuestionInfo) => void;
  handleEditQuestion: (question: IQuestionInfo) => void;
  handleDeleteQuestion: (idQuestion: string) => void;
  // answer
  handleAddNewAnswerQuestion: (answer: IAnswerInfo) => void;
  handleEditAnswerQuestion: (idQuestion: string, answer: IAnswerInfo) => void;
  handleDeleteAnswerQuestion: (answer: IAnswerInfo) => void;
  handleEditAnswerQuestionAll: (
    idQuestion: string,
    answer1: IAnswerInfo,
    answer2: IAnswerInfo
  ) => void;
}
export const CreateQuizContext = React.createContext<CreateQuizContextType>({
  dataQuiz: {
    quiz_id: "",
    lecture_id: "",
    content: "",
    description: "",
    timeout: "",
    duration: 0,
    durationUnit: "m",
    isRandom: false,
    isShowAnswer: false,
    passPercent: 0,
    retakePercent: 0,
    type: "",
    questions: [],
  },
  setDataQuiz: () => {},
  handleChangeQuiz: () => {},
  // question
  handleAddNewQuestion: () => {},
  handleEditQuestion: () => {},
  handleDeleteQuestion: () => {},
  handleAddNewAnswerQuestion: () => {},
  handleEditAnswerQuestion: () => {},
  handleDeleteAnswerQuestion: () => {},
  handleEditAnswerQuestionAll: () => {},
} as CreateQuizContextType);

const CreateQuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataQuiz, setDataQuiz] = React.useState<IQuizInfo>({
    quiz_id: "",
    lecture_id: "",
    description: "",
    content: "",
    timeout: "",
    duration: 0,
    durationUnit: "m",
    isRandom: false,
    isShowAnswer: false,
    passPercent: 0,
    retakePercent: 0,
    type: "",
    questions: [],
  });

  const handleChangeQuiz = (quiz: IQuizInfo) => {
    setDataQuiz(quiz);
  };
  // add new question
  const handleAddNewQuestion = async (question: IQuestionInfo) => {
    try {
      if (question.type === "fill") {
        const resultQuestion = await quizApi.createQuestionQuiz(question);
        if (resultQuestion) {
          const resultAnswer = await quizApi.createAnswerQuestionQuiz({
            question_id: resultQuestion.question_id,
            image: "",
            answer: "Nhập Câu Trả Lời",
            explain: "",
            question: "",
            answer_id: Math.floor(Math.random() * 1000000).toString(),
            isCorrect: 1,
          });
          if (!resultAnswer) return console.log("error");
          const dataQuestion = {
            ...resultQuestion,
            answers: [resultAnswer],
          };
          setDataQuiz({
            ...dataQuiz,
            questions: [...dataQuiz.questions, dataQuestion],
          });
        }
      } else {
        const res = await quizApi.createQuestionQuiz(question);
        if (res) {
          setDataQuiz({
            ...dataQuiz,
            questions: [...dataQuiz.questions, { ...res, answers: [] }],
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm câu hỏi thất bại");
    }
  };
  // edit question
  const handleEditQuestion = async (questionData: IQuestionInfo) => {
    try {
      const res = await quizApi.updateQuestionQuiz(questionData);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === questionData.question_id
              ? questionData
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Sửa câu hỏi thất bại");
    }
  };

  // delete question
  const handleDeleteQuestion = async (idQuestion: string) => {
    try {
      const res = await quizApi.deleteQuestionQuiz(idQuestion);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.filter(
            (question) => question.question_id !== idQuestion
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa câu hỏi thất bại");
    }
  };
  // add new answer of question
  const handleAddNewAnswerQuestion = async (answer: IAnswerInfo) => {
    try {
      const res = await quizApi.createAnswerQuestionQuiz(answer);
      if (res) {
        // console.log(res);
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === answer.question_id
              ? {
                  ...question,
                  answers: [...question.answers, res],
                }
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm câu trả lời thất bại");
    }
  };
  // update answer of question
  const handleEditAnswerQuestion = async (
    idQuestion: string,
    answerData: IAnswerInfo
  ) => {
    try {
      const res = await quizApi.updateAnswerQuestionQuiz(answerData);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === idQuestion
              ? {
                  ...question,
                  answers: question.answers.map((answer) =>
                    answer.answer_id === answerData.answer_id
                      ? answerData
                      : answer
                  ),
                }
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Sửa câu trả lời thất bại");
    }
  };
  // delete answer of question
  const handleDeleteAnswerQuestion = async (answerData: IAnswerInfo) => {
    try {
      const res = await quizApi.deleteAnswerQuestionQuiz(answerData);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === answerData.question_id
              ? {
                  ...question,
                  answers: question.answers.filter(
                    (answer) => answer.answer_id !== answerData.answer_id
                  ),
                }
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa câu trả lời thất bại");
    }
  };
  const handleEditAnswerQuestionAll = async (
    idQuestion: string,
    answerData1: IAnswerInfo,
    answerData2: IAnswerInfo
  ) => {
    try {
      const res = await quizApi.updateAnswerQuestionMultiply(
        answerData1,
        answerData2
      );
      console.log(res);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === idQuestion
              ? {
                  ...question,
                  answers: question.answers.map((answer) => {
                    if (answer.answer_id === answerData1.answer_id) {
                      return answerData1;
                    } else if (answer.answer_id === answerData2.answer_id) {
                      return answerData2;
                    } else {
                      return answer;
                    }
                  }),
                }
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Sửa câu trả lời thất bại");
    }
  };
  return (
    <CreateQuizContext.Provider
      value={{
        dataQuiz,
        setDataQuiz,
        handleChangeQuiz,
        // question
        handleAddNewQuestion,
        handleEditQuestion,
        handleDeleteQuestion,
        // answer
        handleAddNewAnswerQuestion,
        handleEditAnswerQuestion,
        handleDeleteAnswerQuestion,
        handleEditAnswerQuestionAll,
      }}
    >
      {children}
    </CreateQuizContext.Provider>
  );
};

export default CreateQuizProvider;
