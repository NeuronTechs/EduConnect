import { Request, Response } from "express";
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

export default {
  processPayment,
  sendStripApi,
};
