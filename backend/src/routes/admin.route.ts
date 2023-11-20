import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import adminController from "../controllers/admin.controller";

router
  .route("/list-user")
  .get(middlewareController.verifyToken, adminController.getAllUser);

router
  .route("/set-status-user")
  .post(middlewareController.verifyToken, adminController.setStatusUser);
export default router;
