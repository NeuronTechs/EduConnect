import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import reviewController from "../controllers/review.controller";
router.route("/get-reviews/:course_id").get(reviewController.getReviews);
router.route("/get-all-reviews/:course_id").get(reviewController.getAllReviews);
router
  .route("/get-statistic-star/:course_id")
  .get(reviewController.getstatisticStar);
router.route("/add-review").post(reviewController.addNewReview);
export default router;
