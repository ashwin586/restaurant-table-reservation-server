export const userRepositoryInterface = (repository) => ({
  saveUser: (user) => repository.saveUser(user),
  findByEmail: (email) => repository.findByEmail(email),
  findById: (id) => repository.findById(id),
  updateUser: (userId, updatedUserData) =>
    repository.updateUser(userId, updatedUserData),
  fetchAllRestaurants: () => repository.fetchAllRestaurants(),
  fetchRestaurantDetails: (id) => repository.fetchRestaurantDetails(id),
});
