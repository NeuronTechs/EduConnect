import express from "express";
const router = express.Router();

import orderItemController from "../controllers/order_items.controller";

router.route("/create").post(orderItemController.create);
router.route("/:id").put(orderItemController.updateById);
router.route("/:id").delete(orderItemController.deleteById);
router.route("/order/:id").get(orderItemController.getOrderItemByOrderId);
router.route("/course/:id").get(orderItemController.getOrderItemByCourseId);
router.route("/student/:id").get(orderItemController.getOrderItemByStudentId);

export default router;
