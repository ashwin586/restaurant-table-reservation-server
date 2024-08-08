export const userRepositoryInterface = (repository) => ({
  saveUser: (user) => repository.saveUser(user),
  findByEmail: (email) => repository.findByEmail(email),
  findById: (id) => repository.findById(id),
  updateUser: (userId, updatedUserData) =>
    repository.updateUser(userId, updatedUserData),
  fetchAllRestaurants: () => repository.fetchAllRestaurants(),
  fetchRestaurantDetails: (id) => repository.fetchRestaurantDetails(id),
  fetchBookings: (email) => repository.fetchBookings(email),
  fetchReviews: (email) => repository.fetchReviews(email),
  fetchReview: (email, restId) => repository.fetchReview(email, restId),
  saveBooking: (userId, data, total, partnerRevenue, adminRevenue) =>
    repository.saveBooking(userId, data, total, partnerRevenue, adminRevenue),
  inventoryManagment: (cart) => repository.inventoryManagment(cart),
  bookingCancel: (bookingId, email) =>
    repository.bookingCancel(bookingId, email),
  periodBookings: (restaurantId, bookedDate, bookedTime) =>
    repository.periodBookings(restaurantId, bookedDate, bookedTime),
  addingReview: (rating, textReview, restId, userId) =>
    repository(rating, textReview, restId, userId),
});
