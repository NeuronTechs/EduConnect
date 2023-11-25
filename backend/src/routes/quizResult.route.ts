import express from "express";

import quizResultController from "../controllers/quizResult.controller";

const router = express.Router();

router.route("/create").post(quizResultController.createQuizResult);
router
  .route("/lectures/:student_id/:quiz_id")
  .get(quizResultController.getQuizResult);

export default router;
