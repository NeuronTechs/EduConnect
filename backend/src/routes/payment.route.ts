import express from "express";
import PaymentController from "../controllers/payment.controller";
const router = express.Router();

router.route("/process").post(PaymentController.processPayment);
router.route("/stripeapi").get(PaymentController.sendStripApi);

export default router;
