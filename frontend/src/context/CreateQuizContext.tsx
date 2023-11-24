import quizApi from "@/api/quizApi";
import { IAnswerInfo, IQuestionInfo, IQuizInfo } from "@/types/type";
import React from "react";

interface CreateQuizContextType {
  dataQuiz: IQuizInfo;
  setDataQuiz: React.Dispatch<React.SetStateAction<IQuizInfo>>;
  handleChangeQuiz: (quiz: IQuizInfo) => void;
  // question
  handleAddNewQuestion: (question: IQuestionInfo) => void;
  handleEditQuestion: (question: IQuestionInfo) => void;
  handleDeleteQuestion: (idQuestion: string) => void;
  // answer
  handleAddNewAnswerQuestion: (answer: IAnswerInfo, type: string) => void;
  handleEditAnswerQuestion: (idQuestion: string, answer: IAnswerInfo) => void;
  handleDeleteAnswerQuestion: (answer: IAnswerInfo) => void;
}
export const CreateQuizContext = React.createContext<CreateQuizContextType>({
  dataQuiz: {
    resource_id: "",
    lecture_id: "",
    content: "",
    description: "",
    timeout: "",
    duration: 0,
    durationUnit: "",
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
} as CreateQuizContextType);

const CreateQuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataQuiz, setDataQuiz] = React.useState<IQuizInfo>({
    resource_id: "",
    lecture_id: "",
    description: "",
    content: "",
    timeout: "",
    duration: 0,
    durationUnit: "",
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
      const res = await quizApi.createQuestionQuiz(question);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: [...dataQuiz.questions, question],
        });
      }
    } catch (error) {
      console.log(error);
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
            question.question_id === question.question_id
              ? questionData
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
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
    }
  };
  // add new answer of question
  const handleAddNewAnswerQuestion = async (
    answer: IAnswerInfo,
    type: string
  ) => {
    try {
      const res = await quizApi.createAnswerQuestionQuiz(answer);
      if (res) {
        setDataQuiz({
          ...dataQuiz,
          questions: dataQuiz.questions.map((question) =>
            question.question_id === answer.question_id
              ? {
                  ...question,
                  type: type,
                  answers: [...question.answers, res],
                }
              : question
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update answer of question
  const handleEditAnswerQuestion = async (
    idQuestion: string,
    answerData: IAnswerInfo
  ) => {
    try {
      const res = await quizApi.updateAnswerQuestionQuiz(answerData);
      console.log(res);
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
      }}
    >
      {children}
    </CreateQuizContext.Provider>
  );
};

export default CreateQuizProvider;
