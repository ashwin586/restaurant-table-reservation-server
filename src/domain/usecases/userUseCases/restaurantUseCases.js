export const userRestaurantUseCases = (userRepository) => ({
  fetchAllRestaurants: async () => {
    try {
      const response = await userRepository.fetchAllRestaurants();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch restaurants", error);
    }
  },

  fetchRestaurant: async (id) => {
    try {
      const { restaurantDetails, menus, reviews } =
        await userRepository.fetchRestaurantDetails(id);
      return { restaurantDetails, menus, reviews };
    } catch (error) {
      throw new Error("Failed to fetch restaurant details", error);
    }
  },
});
