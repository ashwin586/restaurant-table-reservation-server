import {
  findUser,
  inventoryManagment,
  saveBooking,
  findBookings,
  bookingCancel,
  newReview,
  findingReview,
  findAllReviews,
} from "../../repositories/userRepository.js";

export const tableReservation = async (data, userEmail) => {
  try {
    const user = await findUser(userEmail);
    const userId = user._id;
    await inventoryManagment(data.cart);
    const grantTotal = data.cart.reduce((total, item) => total + item.total, 0);
    const partnerRevenue = 0.8 * grantTotal;
    const adminRevenue = 0.2 * grantTotal;
    await saveBooking(userId, data, grantTotal, partnerRevenue, adminRevenue);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const fetchBookings = async (email) => {
  try {
    const bookings = await findBookings(email);
    if (bookings) {
      return bookings;
    } else {
      throw new Error(`You haven't made a booking yet.`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const cancellingBooking = async (bookingId, userId) => {
  try {
    const response = await bookingCancel(bookingId, userId);
    if (response) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const savingReview = async (review, restId, userEmail) => {
  try {
    const rating = review.rating;
    const textReview = review.experience;
    const user = await findUser(userEmail);
    const userId = user._id;
    const response = await newReview(rating, textReview, restId, userId);
    if (response) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const findReview = async (restId, userEmail) => {
  try {
    const user = await findUser(userEmail);
    const userId = user._id;
    const response = await findingReview(restId, userId);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findreviews = async (userEmail) => {
  try {
    const user = await findUser(userEmail);
    const userId = user._id;
    const response = await findAllReviews(userId);
    if (response) return response;
  } catch (err) {
    console.log(err);
  }
};
