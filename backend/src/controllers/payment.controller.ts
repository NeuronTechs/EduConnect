import { Request, Response } from "express";
import Stripe from "stripe";
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

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.retrieve("pi_3OEUXoAaHjtOXDe91equj2jt");

    // Print detailed information about the payment
    console.log("Payment Details:", paymentIntent);
    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving transaction details:", error);
  }
};

const getPaymentByPaymentId = async (req: Request, res: Response) => {
  try {
    const transaction: Stripe.Charge = await stripe.charges.retrieve(
      "pi_3OEUXoAaHjtOXDe91equj2jt"
    );

    // Print detailed information about the transaction
    console.log("Transaction Details:", transaction);
    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving transaction details:", error);
  }
};

export default {
  processPayment,
  sendStripApi,
  getTransactions,
  getTransactionById,
  getPaymentByPaymentId,
};
