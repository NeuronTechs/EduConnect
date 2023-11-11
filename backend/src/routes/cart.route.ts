import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import cartController from "../controllers/cart.controller";
router
  .route("/addtocart")
  .post(middlewareController.verifyToken, cartController.addToCart);
router
  .route("/removetocart")
  .post(middlewareController.verifyToken, cartController.removeToCart);
router
  .route("/getcart/:student_id")
  .get(middlewareController.verifyToken, cartController.getAllCart);
export default router;
