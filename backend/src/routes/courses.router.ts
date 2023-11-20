import express from "express";
const router = express.Router();
// const uploadCloud = require("../middlewares/uploadCloudinary");
// import middlewareController from "../middlewares/middlewareController";
import coursesController from "../controllers/courses.controller";
router.route("/:idCourse/sections").post(coursesController.createSectionCourse);
router.route("/:idCourse/sections").get(coursesController.getSectionOfCourse);
router.route("/sections").put(coursesController.updateSectionOfCourse);
router
  .route("/sections/:idSection")
  .delete(coursesController.deleteSectionOfCourse);
export default router;
