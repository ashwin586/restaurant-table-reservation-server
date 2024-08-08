import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userBookingUseCases } from "../../../domain/usecases/userUseCases/bookingUseCases.js";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userBookingUseCasesInstance = userBookingUseCases(userRepositoryInstance);

export const userBookingControllers = {
  checkAvailablity: async (req, res) => {
    try {
      const data = req.query;
      const result = await userBookingUseCasesInstance.bookingAvailablity(data);
      if (result) {
        return res.status(200).end();
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  },

  bookingTable: async (req, res) => {
    try {
      const { email } = req.token;
      const result = await userBookingUseCasesInstance.bookingTable(
        req.body,
        email
      );
      if (result) {
        return res.status(200).end();
      }
    } catch (err) {
      console.log(err);
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const email = req.token.email;
      const bookingId = req.body.id;
      const result = await userBookingUseCasesInstance.cancelBooking(
        bookingId,
        email
      );
      if (result) {
        return res.status(200).end();
      }
    } catch (err) {
      console.log(err);
    }
  },

  userReview: async (req, res) => {
    try {
      const review = req.body.values;
      const restId = req.body.id;
      const email = req.token.email;
      const result = await userBookingUseCasesInstance.addingReview(
        review,
        restId,
        email
      );
      if (result) {
        return res.status(200).end();
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  },
};
