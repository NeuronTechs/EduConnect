import express from "express";
const router = express.Router();
import middlewareController from "../middlewares/middlewareController";
import transactionController from "../controllers/transaction.controller";

router.route("/report").get(transactionController.getTransactionReport);

export default router;
