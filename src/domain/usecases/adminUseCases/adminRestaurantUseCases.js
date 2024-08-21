export const adminRestaurantUseCases = (adminRepository) => ({
  fetchAllRestaurant: async () => {
    try {
      return await adminRepository.fetchAllRestaurants();
    } catch (error) {
      throw new Error(error);
    }
  },

  unlistRestaurant: async (id) => {
    try {
      const existingRestaurant = await adminRepository.findRestaurant(id);
      if (existingRestaurant) {
        existingRestaurant.isBlocked = true;
        await adminRepository.toggleRestaurant(existingRestaurant);
      } else throw new Error("Operation Failed");
    } catch (error) {
      throw new Error(error);
    }
  },

  listRestaurant: async (id) => {
    try {
      const existingRestaurant = await adminRepository.findRestaurant(id);
      if (existingRestaurant) {
        existingRestaurant.isBlocked = false;
        await adminRepository.toggleRestaurant(existingRestaurant);
      } else throw new Error("Operation Failed");
    } catch (error) {
      throw new Error(error);
    }
  },

  approveRestaurant: async (id) => {
    try {
      const existingRestaurant = await adminRepository.findRestaurant(id);
      if (existingRestaurant) {
        existingRestaurant.isApproved = "Approved";
        await adminRepository.toggleRestaurant(existingRestaurant);
      } else throw new Error("Something went Wrong");
    } catch (error) {
      throw new Error(error);
    }
  },

  rejectRestaurant: async (id) => {
    try {
      const existingRestaurant = await adminRepository.findRestaurant(id);
      if (existingRestaurant) {
        existingRestaurant.isApproved = "Rejected";
        await adminRepository.toggleRestaurant(existingRestaurant);
      } else throw new Error("Something went Wrong");
    } catch (error) {
      throw new Error(error);
    }
  },
});
