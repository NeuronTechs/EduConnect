import express from "express";
const router = express.Router();
import multer from "multer";

const upload = multer();
// import middlewareController from "../middlewares/middlewareController";
import teacherController from "../controllers/teacher.controller";

router
  .route("/recommendations")
  .get(teacherController.getTeacherRecommendations);
router.route("/:teacherId").get(teacherController.getTeacherDetail);
router.route("/courses").post(teacherController.createCourseTeacher);
router.route("/:teacherId/courses").get(teacherController.getCourseTeacher);
router
  .route("/:teacherId/courses/:courseId")
  .put(teacherController.updateCourseTeacher);
export default router;
