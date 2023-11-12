import express from "express";
import userRoutes from "./user.route";
import cartRoutes from "./cart.route";
const courseRouter = require("./course.route");
import sessionRouter from "./session.route";
import lectureRouter from "./lecture.route";
import orderItemRouter from "./order_items.route";
import commentRouter from "./comment.route";
import paymentRouter from "./payment.route";
import reviewRouter from "./review.route";
import topicRouter from "./topic.route";
import teacherRouter from "./teacher.route";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/course", courseRouter);
router.use("/session", sessionRouter);
router.use("/lecture", lectureRouter);
router.use("/order", orderItemRouter);
router.use("/cart", cartRoutes);
router.use("/comment", commentRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);
// restful api
router.use("/topics", topicRouter);
router.use("/teachers", teacherRouter);

export default router;
