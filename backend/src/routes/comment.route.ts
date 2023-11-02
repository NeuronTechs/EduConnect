import express from "express";
const router = express.Router();
import commentController from "../controllers/comment.controller";

router.route("/create").post(commentController.create);
router.route("/:id").get(commentController.getById);
router.route("/:id").put(commentController.update);
router.route("/:id").delete(commentController.deleteById);
router.route("/comments-by-lecture/:id").get(commentController.getByLectureId);

export default router;
