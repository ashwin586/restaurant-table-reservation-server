export const userBookingUseCases = (userRepository, razorPay) => ({
  bookingAvailablity: async (data) => {
    try {
      const { restaurantId, selectedSeats, bookingDate, bookingTime } = data;
      const { restaurantDetails } = await userRepository.fetchRestaurantDetails(
        restaurantId
      );
      const existingBookings = await userRepository.periodBookings(
        restaurantId,
        bookingDate,
        bookingTime
      );
      const totalSeatsBooked = existingBookings.reduce(
        (total, booking) => total + booking.numberOfSeats,
        0
      );
      const availableSeats = restaurantDetails.seats - totalSeatsBooked;
      if (selectedSeats > availableSeats)
        throw new Error("No seats available during this time");
    } catch (error) {
      throw new Error(error);
    }
  },

  bookingTable: async (data, email) => {
    try {
      const user = await userRepository.findByEmail(email);
      const userId = user._id;
      await userRepository.inventoryManagment(data.cart);
      const grantTotal = data.cart.reduce(
        (total, item) => total + item.total,
        0
      );
      const partnerRevenue = 0.8 * grantTotal;
      const adminRevenue = 0.2 * grantTotal;
      await userRepository.saveBooking(
        userId,
        data,
        grantTotal,
        partnerRevenue,
        adminRevenue
      );
    } catch (error) {
      throw new Error(error);
    }
  },

  initiatePayment: async (amount, currency) => {
    try {
      const payment = await razorPay.initiatePayment(amount, currency);
      return payment;
    } catch (error) {
      throw new Error(error);
    }
  },

  verifyPayment: async (body, razorpay_signature) => {
    try {
      const result = await razorPay.handlePayment(
        body,
        razorpay_signature,
      );
      if (result) return true;
    } catch (error) {
      throw new Error(error);
    }
  },

  cancelBooking: async (bookingId, email) => {
    try {
      await userRepository.bookingCancel(bookingId, email);
    } catch (error) {
      throw new Error(error);
    }
  },

  addingReview: async (review, restId, email) => {
    try {
      const rating = review.rating;
      const textReview = review.experience;
      const user = await userRepository.findByEmail(email);
      const userId = user._id;
      await userRepository.addingReview(rating, textReview, restId, userId);
    } catch (error) {
      throw new Error(error);
    }
  },
});
