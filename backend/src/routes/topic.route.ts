import express from "express";
const router = express.Router();
// import middlewareController from "../middlewares/middlewareController";
import topicController from "../controllers/topic.controller";
import middlewareController from "../middlewares/middlewareController";

router
  .route("/recommendations")
  .get(middlewareController.verifyToken, topicController.getRecommendCourse);
router
  .route("/:topicId/courses")
  .get(middlewareController.verifyToken, topicController.getTopicCourse);
router
  .route("/")
  .get(middlewareController.verifyToken, topicController.getTopicCategory);
router
  .route("/all")
  .get(middlewareController.verifyToken, topicController.getAllTopic);

export default router;
