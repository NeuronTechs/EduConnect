import express from "express";
import PaymentController from "../controllers/payment.controller";
const router = express.Router();

router.route("/process").post(PaymentController.processPayment);
router.route("/stripeapi").get(PaymentController.sendStripApi);
router.route("/get-transaction").get(PaymentController.getTransactions);
router
  .route("/get-payment/:username")
  .get(PaymentController.getPaymentByPaymentId);
router
  .route("/teacher-payment/:teacher_id")
  .get(PaymentController.getPaymentByPaymentTeacherId);
export default router;
