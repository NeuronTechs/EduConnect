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
  .route("/change-password")
  .post(middlewareController.verifyToken, AuthController.changePassword);
router
  .route("/updateinformation")
  .post(middlewareController.verifyToken, AuthController.updateInformation);
router
  .route("/information-teacher/:teacher_id")
  .get(middlewareController.verifyToken, AuthController.getInforTeacher);
router
  .route("/process-course/:student_id")
  .get(
    middlewareController.verifyToken,
    AuthController.getProcessCourseByStudentId
  );
export default router;
