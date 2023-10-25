import express from "express";
const router = express.Router();
import courseController from "../controllers/course.controller";

router.route("/create").post(courseController.create);
router.route("/").get(courseController.getAll);
router.route("/:id").get(courseController.getById);
router.route("/:id").put(courseController.update);
router.route("/:id").delete(courseController.deleteById);
router
  .route("/courses-by-teacher/:id")
  .get(courseController.getCourseByTeacherId);
module.exports = router;
