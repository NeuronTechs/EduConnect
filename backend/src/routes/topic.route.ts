import express from "express";
const router = express.Router();
// import middlewareController from "../middlewares/middlewareController";
import topicController from "../controllers/topic.controller";

router.route("/recommendations").get(topicController.getRecommendCourse);
router.route("/::topicId/courses").get(topicController.getTopicCourse);
router.route("/").get(topicController.getTopicCategory);

export default router;
