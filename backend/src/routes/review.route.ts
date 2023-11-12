import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import reviewController from "../controllers/review.controller";
router
  .route("/get-reviews/:course_id")
  .get(middlewareController.verifyToken, reviewController.getReviews);
router
  .route("/get-all-reviews/:course_id")
  .get(middlewareController.verifyToken, reviewController.getAllReviews);
router
  .route("/get-statistic-star/:course_id")
  .get(middlewareController.verifyToken, reviewController.getstatisticStar);
router
  .route("/add-review")
  .post(middlewareController.verifyToken, reviewController.addNewReview);
export default router;
