import express from "express";
const router = express.Router();
// import middlewareController from "../middlewares/middlewareController";
import teacherController from "../controllers/teacher.controller";

router
  .route("/recommended-courses")
  .get(teacherController.getTeacherRecommendations);
router.route("/::teacherId").get(teacherController.getTeacherDetail);

export default router;
