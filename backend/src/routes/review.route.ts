import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import reviewController from "../controllers/review.controller";
router
  .route("/get-reviews")
  .get(middlewareController.verifyToken, reviewController.getReviews);
router
  .route("/get-all-reviews")
  .get(middlewareController.verifyToken, reviewController.getAllReviews);
router
  .route("/get-statistic-star")
  .get(middlewareController.verifyToken, reviewController.getstatisticStar);
router
  .route("/add-review")
  .post(middlewareController.verifyToken, reviewController.addNewReview);
export default router;
