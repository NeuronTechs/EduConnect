import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import transactionController from "../controllers/transaction.controller";

router.route("/report").get(transactionController.getTransactionReport);
router
  .route("/teacher-report/:teacher_id")
  .get(
    middlewareController.verifyToken,
    transactionController.getTeacherReport
  );
router
  .route("/transaction-course-teacher/:teacher_id")
  .get(transactionController.getTransactionEachCourseByTeacher);

export default router;
