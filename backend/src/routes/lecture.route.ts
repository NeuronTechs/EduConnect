import express from "express";
const router = express.Router();

import lectureController from "../controllers/lecture.controller";

router.route("/create").post(lectureController.create);
router.route("/:id").put(lectureController.updateById);
router.route("/:id").delete(lectureController.deleteById);
router.route("/session/:id").get(lectureController.getBySessionId);
router.route("/:id").get(lectureController.getByLectureId);

export default router;
