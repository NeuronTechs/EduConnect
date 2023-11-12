import express from "express";
const router = express.Router();
import AuthController from "../controllers/user.controller";
import middlewareController from "../middlewares/middlewareController";
router.route("/login").post(AuthController.login);
router.route("/refreshToken").post(AuthController.refreshToken);
router.route("/logout").post(AuthController.logout);
router.route("/register").post(AuthController.register);
router.route("/forgetpassword").post(AuthController.isValidEmail);
router.route("/reset-password").post(AuthController.resetPassword);
router
  .route("/updateinformation")
  .post(middlewareController.verifyToken, AuthController.updateInformation);

export default router;
