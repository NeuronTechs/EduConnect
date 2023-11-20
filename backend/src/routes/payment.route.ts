import express from "express";
import PaymentController from "../controllers/payment.controller";
const router = express.Router();

router.route("/process").post(PaymentController.processPayment);
router.route("/stripeapi").get(PaymentController.sendStripApi);
router.route("/get-transaction").get(PaymentController.getTransactions);
router.route("/get-transaction/:id").get(PaymentController.getTransactionById);
router.route("/get-payment/:id").get(PaymentController.getPaymentByPaymentId);
export default router;
