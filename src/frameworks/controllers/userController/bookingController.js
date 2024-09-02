import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userBookingUseCases } from "../../../domain/usecases/userUseCases/bookingUseCases.js";

import * as razorpay from "../../../infrastructure/services/razorPay.js";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userBookingUseCasesInstance = userBookingUseCases(
  userRepositoryInstance,
  razorpay
);

export const userBookingControllers = {
  checkAvailablity: async (req, res) => {
    try {
      const data = req.query;
      await userBookingUseCasesInstance.bookingAvailablity(data);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  bookingTable: async (req, res) => {
    try {
      const { email } = req.token;
      await userBookingUseCasesInstance.bookingTable(req.body, email);
      return res.status(200).json("Payment success, Seat has been booked");
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  initiatePayment: async (req, res) => {
    try {
      const { amount, currency } = req.body;
      const response = await userBookingUseCasesInstance.initiatePayment(
        amount,
        currency
      );

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const response = await userBookingUseCasesInstance.verifyPayment(
        body,
        razorpay_signature
      );
      console.log(response);
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const email = req.token.email;
      const bookingId = req.body.id;
      await userBookingUseCasesInstance.cancelBooking(bookingId, email);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  userReview: async (req, res) => {
    try {
      const review = req.body.values;
      const restId = req.body.id;
      const email = req.token.email;
      await userBookingUseCasesInstance.addingReview(review, restId, email);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
