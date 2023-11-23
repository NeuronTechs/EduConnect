import { Request, Response } from "express";
import Stripe from "stripe";
import TransactionService from "../services/Transaction.service";
const stripe = require("stripe")(
  "sk_test_51O5eyBAaHjtOXDe9uqRrh3xdUxymZWsUtoTIepP5N83Q0seAnvEWFJG7E8DhKjQ4xBKx0dhrkDBTqD6Lw2REGT0a00zTx49f8b"
);
const processPayment = async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "vnd",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const sendStripApi = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      stripeApiKey:
        "pk_test_51O5eyBAaHjtOXDe9Tpr7lvWGeKnA940mQgS8jWHAfM2yfSM8uVDxC6H9hL58KGsAzQCPy6ZtKXLy88tfjhOqulZB00QzKSUUQf",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions: Stripe.ApiList<Stripe.Charge> =
      await stripe.charges.list({ limit: 10 });

    // Print information about transactions
    transactions.data.forEach((transaction) => {
      console.log(
        `Transaction ID: ${transaction.id}, Amount: ${
          transaction.amount / 100
        } ${transaction.currency}`
      );
    });
    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getCartDetails = async (paymentId: string) => {
  try {
    const payment = await stripe.paymentIntents.retrieve(paymentId);
    const paymentMethod = await stripe.paymentMethods.retrieve(
      payment?.payment_method as string
    );

    if (paymentMethod && paymentMethod.card) {
      const cardDetails = {
        brand: paymentMethod.card.brand,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
        last4: paymentMethod.card.last4,
      };
      return cardDetails;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

const getPaymentByPaymentId = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const result = await TransactionService.getTransactionByStudent(username);
    if (result?.status) {
      const transactions = result?.data;

      for (const transaction of transactions) {
        const cardDetails = await getCartDetails(transaction.transaction_id);

        if (cardDetails) {
          transaction.cardDetails = cardDetails;
        } else {
          transaction.cardDetails = {};
        }
      }
      res.status(200).json({
        status: 200,
        data: transactions,
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getPaymentByPaymentTeacherId = async (req: Request, res: Response) => {
  try {
    const { teacher_id } = req.params;
    const result = await TransactionService.getTransactionByTeacher(teacher_id);
    if (result?.status) {
      const transactions = result?.data;
      for (const transaction of transactions) {
        const cardDetails = await getCartDetails(transaction.transaction_id);

        if (cardDetails) {
          transaction.cardDetails = cardDetails;
        } else {
          transaction.cardDetails = {};
        }
      }
      res.status(200).json({
        status: 200,
        data: transactions,
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

export default {
  processPayment,
  sendStripApi,
  getTransactions,
  getPaymentByPaymentId,
  getPaymentByPaymentTeacherId,
};
