import { IAnswerInfo, IQuestionInfo, IQuizInfo } from "@/types/type";
import React from "react";

interface CreateQuizContextType {
  dataQuiz: IQuizInfo;
  setDataQuiz: React.Dispatch<React.SetStateAction<IQuizInfo>>;
  handleChangeQuiz: (quiz: IQuizInfo) => void;
  handleChangeTitleQuiz: (title: string) => void;
  // question
  handleAddNewQuestion: (question: IQuestionInfo) => void;
  handleEditQuestion: (question: IQuestionInfo) => void;
  handleDeleteQuestion: (idQuestion: number) => void;
  handleEditAnswerQuestion: (idQuestion: number, answer: IAnswerInfo) => void;
  handleDeleteAnswerQuestion: (idQuestion: number, idAnswer: number) => void;
}
export const CreateQuizContext = React.createContext<CreateQuizContextType>({
  dataQuiz: {
    id: 0,
    title: "",
    descriptionShort: "",
    duration: 0,
    durationUnit: "",
    isRandom: false,
    isShowAnswer: false,
    passPercent: 0,
    retakePercent: 0,
    type: "",
    questions: [],
    content: "",
  },
  setDataQuiz: () => {},
  handleChangeQuiz: () => {},
  handleChangeTitleQuiz: () => {},
  // question
  handleAddNewQuestion: () => {},
  handleEditQuestion: () => {},
  handleDeleteQuestion: () => {},
  handleEditAnswerQuestion: () => {},
  handleDeleteAnswerQuestion: () => {},
} as CreateQuizContextType);

const CreateQuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataQuiz, setDataQuiz] = React.useState<IQuizInfo>({
    id: 0,
    title: "",
    descriptionShort: "",
    duration: 0,
    durationUnit: "",
    isRandom: false,
    isShowAnswer: false,
    passPercent: 0,
    retakePercent: 0,
    type: "",
    questions: [],
    content: "",
  });

  const handleChangeTitleQuiz = (title: string) => {
    console.log(title);
    setDataQuiz({ ...dataQuiz, title: title });
  };
  const handleChangeQuiz = (quiz: IQuizInfo) => {
    setDataQuiz(quiz);
  };
  const handleAddNewQuestion = (question: IQuestionInfo) => {
    setDataQuiz({ ...dataQuiz, questions: [...dataQuiz.questions, question] });
  };
  const handleEditQuestion = (question: IQuestionInfo) => {
    setDataQuiz({
      ...dataQuiz,
      questions: dataQuiz.questions.map((item) =>
        item.id === question.id ? question : item
      ),
    });
  };
  const handleDeleteQuestion = (idQuestion: number) => {
    setDataQuiz({
      ...dataQuiz,
      questions: dataQuiz.questions.filter((item) => item.id !== idQuestion),
    });
  };

  const handleEditAnswerQuestion = (
    idQuestion: number,
    answer: IAnswerInfo
  ) => {
    setDataQuiz({
      ...dataQuiz,
      questions: dataQuiz.questions.map((item) =>
        item.id === idQuestion
          ? {
              ...item,
              answers: item.answers.map((item) =>
                item.id === answer.id ? answer : item
              ),
            }
          : item
      ),
    });
  };

  const handleDeleteAnswerQuestion = (idQuestion: number, idAnswer: number) => {
    setDataQuiz({
      ...dataQuiz,
      questions: dataQuiz.questions.map((item) =>
        item.id === idQuestion
          ? {
              ...item,
              answers: item.answers.filter((item) => item.id !== idAnswer),
            }
          : item
      ),
    });
  };
  return (
    <CreateQuizContext.Provider
      value={{
        dataQuiz,
        setDataQuiz,
        handleChangeQuiz,
        handleChangeTitleQuiz,
        // question
        handleAddNewQuestion,
        handleEditQuestion,
        handleDeleteQuestion,
        // answer
        handleEditAnswerQuestion,
        handleDeleteAnswerQuestion,
      }}
    >
      {children}
    </CreateQuizContext.Provider>
  );
};

export default CreateQuizProvider;
