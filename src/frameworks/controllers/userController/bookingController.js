import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userBookingUseCases } from "../../../domain/usecases/userUseCases/bookingUseCases.js";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userBookingUseCasesInstance = userBookingUseCases(userRepositoryInstance);

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
      return res.status(200).end();
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
