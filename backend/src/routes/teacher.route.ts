import express from "express";
const router = express.Router();
// import middlewareController from "../middlewares/middlewareController";
import teacherController from "../controllers/teacher.controller";

router
  .route("/recommendations")
  .get(teacherController.getTeacherRecommendations);
router.route("/:teacherId").get(teacherController.getTeacherDetail);
router.route("/courses").post(teacherController.createCourseTeacher);
export default router;
