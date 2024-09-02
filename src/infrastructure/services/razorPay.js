import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

const razorPay = new Razorpay({
  key_id: process.env.RAZORPAYKEYID,
  key_secret: process.env.RAZORPAYKEYSECRET,
});

export const initiatePayment = async (amount, currency) => {
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${new Date().getTime()}`,
    };
    const payment = await razorPay.orders.create(options);
    return payment;
  } catch (error) {
    throw new Error(error);
  }
};

export const handlePayment = async (body, razorpay_signature) => {
  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      razorPay.key_secret
    );
    if (isValidSignature) return true;
  } catch (error) {
    throw new Error(error);
  }
};
