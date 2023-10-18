import express from "express";
import userRoutes from "./user.route";
const courseRouter = require("./course.route");
import sessionRouter from "./session.route";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/course", courseRouter);
router.use("/session", sessionRouter);
export default router;
