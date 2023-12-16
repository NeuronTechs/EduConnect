import express from "express";
const router = express.Router();
const uploadCloud = require("../middlewares/uploadCloudinary");
// import middlewareController from "../middlewares/middlewareController";
import teacherController from "../controllers/teacher.controller";
import middlewareController from "../middlewares/middlewareController";

router
  .route("/recommendations")
  .get(teacherController.getTeacherRecommendations);
router.route("/:teacherId").get(teacherController.getTeacherDetail);
// create course
router
  .route("/courses")
  .post(
    middlewareController.verifyToken,
    teacherController.createCourseTeacher
  );

router.route("/:id/courses/all").get(teacherController.getCourseByTeacher);
router
  .route("/:teacherId/courses/:courseId")
  .get(teacherController.getCourseTeacherById);
router.route("/:teacherId/courses").get(teacherController.getCourseTeacher);
router.route("/list-student/:id").get(teacherController.getStudentByTeacher);
router
  .route("/:teacherId/courses/:courseId")
  .put(
    middlewareController.verifyToken,
    uploadCloud.single("image"),
    teacherController.updateCourseTeacher
  );
router
  .route("/:teacherId/courses/:courseId")
  .patch(
    middlewareController.verifyToken,
    teacherController.updateSectionOfCourse
  );

export default router;
