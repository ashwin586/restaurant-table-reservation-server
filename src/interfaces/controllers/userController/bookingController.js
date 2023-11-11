import { tableReservation } from "../../../usecases/userUseCases/bookingUseCases.js";

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
