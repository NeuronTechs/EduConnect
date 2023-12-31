import express from "express";
const router = express.Router();
import courseController from "../controllers/course.controller";
import middlewareController from "../middlewares/middlewareController";
const uploadCloud = require("../middlewares/uploadCloudinary");

router.route("/create").post(courseController.create);
router
  .route("/get-complaint-course")
  .get(middlewareController.verifyToken, courseController.getComplaintCourse);
router
  .route("/get-complaint-detail/:id")
  .get(middlewareController.verifyToken, courseController.getComplaintDetail);
router.route("/").get(courseController.getAll);
router.route("/:id").get(courseController.getById);
router.route("/:id").put(courseController.update);
router.route("/:id").delete(courseController.deleteById);
router
  .route("/courses-by-teacher/:id")
  .get(courseController.getCourseByTeacherId);
router
  .route("/courses-by-student/:id")
  .get(middlewareController.verifyToken, courseController.getCourseByStudentId);
router
  .route("/course-details/:id/users/:user_id/role/:role")
  .get(middlewareController.verifyToken, courseController.getCourseDetails);
router
  .route("/overview-course/:id")
  .get(courseController.getOverviewCourse);
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

router
  .route("/resolve-complaint-course")
  .post(
    middlewareController.verifyToken,
    courseController.resolveComplaintCourse
  );

router
  .route("/get-course-last-recent/:id")
  .get(courseController.getCourseLastRecentByStudentId);
module.exports = router;
