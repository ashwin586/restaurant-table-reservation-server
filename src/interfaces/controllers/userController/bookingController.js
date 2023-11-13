import {
  fetchBookings,
  tableReservation,
} from "../../../usecases/userUseCases/bookingUseCases.js";

export const bookingTable = async (req, res) => {
  try {
    const userEmail = req.token.email;
    const result = await tableReservation(req.body, userEmail);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export const getBookings = async (req, res) => {
  try {
    const email = req.token.email;
    const result = await fetchBookings(email);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
