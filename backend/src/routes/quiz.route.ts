import express from "express";
import quizController from "../controllers/quiz.controller";
const router = express.Router();

router.route("/lectures/:idLectures").post(quizController.createQuiz);
router.route("/lectures/:idLectures").get(quizController.getQuiz);
router.route("/lectures/:idLectures").put(quizController.updateQuiz);

// question
router.route("/questions").post(quizController.createQuestionQuiz);
router.route("/questions").put(quizController.updateQuestionQuiz);
router
  .route("/questions/:idQuestion")
  .delete(quizController.deleteQuestionQuiz);
//   answer
router
  .route("/questions/:idQuestion/answers")
  .post(quizController.createAnswerQuestionQuiz);
router
  .route("/questions/:idQuestion/answers")
  .put(quizController.updateAnswerQuestionQuiz);
router
  .route("/questions/:idQuestion/answers/:idAnswer")
  .delete(quizController.deleteAnswerQuestionQuiz);

//   get quiz not expired
router
  .route("/quizNotExpired/:student_id")
  .get(quizController.getQuizNotExpired);
export default router;
