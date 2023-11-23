import express from "express";
const router = express.Router();
import commentController from "../controllers/comment.controller";
import middlewareController from "../middlewares/middlewareController";
const uploadCloud = require("../middlewares/uploadCloudinary");
router
  .route("/create")
  .post(
    middlewareController.verifyToken,
    uploadCloud.array("files"),
    commentController.create
  );
router.route("/:id").get(commentController.getById);
router.route("/:id").put(commentController.update);
router.route("/:id").delete(commentController.deleteById);
router
  .route("/comments-by-lecture/:id")
  .get(middlewareController.verifyToken, commentController.getByLectureId);
router
  .route("/reply-by-comment/:id")
  .get(commentController.getReplyByCommentId);
export default router;
