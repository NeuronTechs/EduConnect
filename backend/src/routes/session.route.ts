import express from "express";
const router = express.Router();

import SessionController from "../controllers/session.controller";

router.route("/create").post(SessionController.create);
router
  .route("/session-of-course/:id")
  .get(SessionController.getSessionByCourseId);
router.route("/:id").put(SessionController.updateById);
router.route("/:id").delete(SessionController.deleteById);

export default router;
