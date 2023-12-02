import { answer } from "@/components/Course/Quiz";
import { IAnswerInfo, IQuestionInfo, IQuizInfo } from "@/types/type";
import * as httpRequests from "@/utils/httpRequest";

export const getQuiz = async (idLectures: string) => {
  try {
    const response = await httpRequests.get(`/quiz/lectures/${idLectures}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const createQuiz = async (idLectures: string, quiz: IQuizInfo) => {
  const response = await httpRequests.post(
    `/quiz/lectures/${idLectures}`,
    quiz
  );
  return response.data;
};
const updateQuiz = async (quiz: IQuizInfo) => {
  const response = await httpRequests.put(`/quiz/lectures/${quiz.lecture_id}`, {
    resource_id: quiz.resource_id,
    lecture_id: quiz.lecture_id,
    description: quiz.description,
    timeout: quiz.timeout,
    duration: quiz.duration,
    durationUnit: quiz.durationUnit,
    isRandom: quiz.isRandom,
    isShowAnswer: quiz.isShowAnswer,
    type: quiz.type,
    passPercent: quiz.passPercent,
    retakePercent: quiz.retakePercent,
    content: quiz.content,
  });
  return response.data;
};

const createQuestionQuiz = async (question: IQuestionInfo) => {
  try {
    const response = await httpRequests.post(`/quiz/questions`, {
      quiz_id: question.quiz_id,
      lecture_id: question.lecture_id,
      question: question.question,
      type: question.type,
      image: question.images ? question.images : "",
      // answers: question.answers,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const updateQuestionQuiz = async (question: IQuestionInfo) => {
  try {
    const response = await httpRequests.put(`/quiz/questions`, {
      question_id: question.question_id,
      quiz_id: question.quiz_id,
      lecture_id: question.lecture_id,
      question: question.question,
      image: question.images ? question.images : "",
      type: question.type,
      // answers: question.answers,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const deleteQuestionQuiz = async (idQuestion: string) => {
  try {
    const response = await httpRequests.deleted(
      `/quiz/questions/${idQuestion}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
// answer
const createAnswerQuestionQuiz = async (answer: IAnswerInfo) => {
  try {
    const response = await httpRequests.post(
      `/quiz/questions/${answer.question_id}/answers`,
      {
        question_id: answer.question_id,
        answer: answer.answer ? answer.answer : "",
        image: answer.image ? answer.image : "",
        explain: answer.explain ? answer.explain : "",
        isCorrect: answer.isCorrect ? answer.isCorrect : false,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const updateAnswerQuestionQuiz = async (answer: IAnswerInfo) => {
  console.log(answer);
  try {
    const response = await httpRequests.put(
      `/quiz/questions/${answer.question_id}/answers`,
      {
        answer_id: answer.answer_id,
        question_id: answer.question_id,
        answer: answer.answer ? answer.answer : "",
        image: answer.image ? answer.image : "",
        explain: answer.explain ? answer.explain : "",
        isCorrect: answer.isCorrect,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const deleteAnswerQuestionQuiz = async (answer: IAnswerInfo) => {
  try {
    const response = await httpRequests.deleted(
      `/quiz/questions/${answer.question_id}/answers/${answer.answer_id}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createQuizResult = async (
  student_id: string,
  quiz_id: string,
  answer: answer[],
  score: string
) => {
  try {
    const response = await httpRequests.post(`/quiz-result/create`, {
      student_id,
      quiz_id,
      answer,
      score,
    });
    return response.data;
  } catch (error) {
    return error;
    // return Promise.reject(error);
  }
};

export const getResults = async (student_id: string, quiz_id: string) => {
  try {
    const response = await httpRequests.get(
      `/quiz-result/lectures/${student_id}/${quiz_id}`
    );
    console.log(response);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getQuizNotExpired = async (student_id: string) => {
  try {
    const response = await httpRequests.get(
      `/quiz/quizNotExpired/${student_id}`
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  getQuiz,
  createQuiz,
  updateQuiz,
  getQuizNotExpired,
  // question
  createQuestionQuiz,
  updateQuestionQuiz,
  deleteQuestionQuiz,
  // answer
  createAnswerQuestionQuiz,
  updateAnswerQuestionQuiz,
  deleteAnswerQuestionQuiz,
  // result
  createQuizResult,
  getResults,
};
