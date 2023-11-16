import express from "express";
const router = express.Router();
import courseController from "../controllers/course.controller";
import middlewareController from "../middlewares/middlewareController";
const uploadCloud = require("../middlewares/uploadCloudinary");

router.route("/create").post(courseController.create);
router
  .route("/get-complaint-course")
  .get(middlewareController.verifyToken, courseController.getComplaintCourse);
router.route("/").get(courseController.getAll);
router.route("/:id").get(courseController.getById);
router.route("/:id").put(courseController.update);
router.route("/:id").delete(courseController.deleteById);
router
  .route("/courses-by-teacher/:id")
  .get(courseController.getCourseByTeacherId);
router
  .route("/courses-by-student/:id")
  .get(courseController.getCourseByStudentId);
router
  .route("/course-details/:id/users/:user_id")
  .get(middlewareController.verifyToken, courseController.getCourseDetails);
router
  .route("/overview-course/:id")
  .get(middlewareController.verifyToken, courseController.getOverviewCourse);
router
  .route("/add-transaction-course")
  .post(
    middlewareController.verifyToken,
    courseController.addTransactionInCourse
  );

router
  .route("/complaint-course")
  .post(
    middlewareController.verifyToken,
    uploadCloud.array("files"),
    courseController.complaintCourse
  );
module.exports = router;
