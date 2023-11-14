import express from "express";
const router = express.Router();
import commentController from "../controllers/comment.controller";
const uploadCloud = require("../middlewares/uploadClouldinary");
router
  .route("/create")
  .post(uploadCloud.array("files"), commentController.create);
router.route("/:id").get(commentController.getById);
router.route("/:id").put(commentController.update);
router.route("/:id").delete(commentController.deleteById);
router.route("/comments-by-lecture/:id").get(commentController.getByLectureId);

export default router;
