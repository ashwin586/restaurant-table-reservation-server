import {
  bookingAvailablity,
  cancellingBooking,
  fetchBookings,
  findReview,
  findreviews,
  savingReview,
  tableReservation,
} from "../../../domain/usecases/userUseCases/bookingUseCases.js";

export const checkAvailablity = async (req, res) => {
  try {
    const result = await bookingAvailablity(req.query);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

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

export const cancelBooking = async (req, res) => {
  try {
    const result = await cancellingBooking(req.body.id, req.token.email);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export const userReview = async (req, res) => {
  try {
    const result = await savingReview(
      req.body.values,
      req.body.id,
      req.token.email
    );
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchReview = async (req, res) => {
  try {
    const result = await findReview(req.query.id, req.token.email);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchReviews = async (req, res) => {
  try {
    const result = await findreviews(req.token.email);
    if (result) return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};
