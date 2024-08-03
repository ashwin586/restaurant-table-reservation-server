export const userRestaurantUseCases = (userRepository) => ({
  fetchAllRestaurants: async () => {
    try {
      const response = await userRepository.fetchAllRestaurants();
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchRestaurant: async (id) => {
    try {
      const {restaurantDetails, menus, reviews } = await userRepository.fetchRestaurantDetails(id);
      return { restaurantDetails, menus, reviews };
    } catch (err) {
      throw new Error(err);
    }
  },
});
