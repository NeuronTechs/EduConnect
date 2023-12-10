import express from "express";
const router = express.Router();
const uploadCloud = require("../middlewares/uploadCloudinary");
// import middlewareController from "../middlewares/middlewareController";
import teacherController from "../controllers/teacher.controller";
import middlewareController from "../middlewares/middlewareController";

router
  .route("/recommendations")
  .get(teacherController.getTeacherRecommendations);
router
  .route("/:teacherId")
  .get(middlewareController.verifyToken, teacherController.getTeacherDetail);
router
  .route("/courses")
  .post(
    middlewareController.verifyToken,
    teacherController.createCourseTeacher
  );
router
  .route("/:id/courses/all")
  .get(middlewareController.verifyToken, teacherController.getCourseByTeacher);
router
  .route("/:teacherId/courses/:courseId")
  .get(
    middlewareController.verifyToken,
    teacherController.getCourseTeacherById
  );
router
  .route("/:teacherId/courses")
  .get(middlewareController.verifyToken, teacherController.getCourseTeacher);
router
  .route("/list-student/:id")
  .get(middlewareController.verifyToken, teacherController.getStudentByTeacher);
router
  .route("/:teacherId/courses/:courseId")
  .put(
    middlewareController.verifyToken,
    uploadCloud.single("image"),
    teacherController.updateCourseTeacher
  );

export default router;
