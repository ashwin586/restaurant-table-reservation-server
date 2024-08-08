export const userBookingUseCases = (userRepository) => ({
  bookingAvailablity: async (data) => {
    try {
      const { restaurantId, selectedSeats, bookingDate, bookingTime } = data;
      const { restaurantDetails } = await userRepository.fetchRestaurantDetails(
        restaurantId
      );
      console.log(restaurantDetails);
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
      else return true;
    } catch (err) {
      throw new Error(err.message);
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
      return true;
    } catch (err) {
      throw new Error(err);
    }
  },

  cancelBooking: async (bookingId, email) => {
    try {
      const response = await userRepository.bookingCancel(bookingId, email);
      if (response) {
        return true;
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  addingReview: async (review, restId, email) => {
    try {
      const rating = review.rating;
      const textReview = review.experience;
      const user = await userRepository.findByEmail(email);
      const userId = user._id;
      const response = await userRepository.addingReview(rating, textReview, restId, userId);
      if (response) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  },
});

