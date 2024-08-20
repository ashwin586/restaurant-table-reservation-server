import { createRestaurant } from "../../entities/restaurants.js";

export const partnerRestaurantUseCases = (partnerRepository, moment) => ({
  createRestaurant: async (restData, number) => {
    try {
      const partner = await partnerRepository.findPartner(number);
      const id = partner._id;
      const openTime = moment.selectedTime(restData.openTime);
      const closeTime = moment.selectedTime(restData.closeTime);
      const newRest = createRestaurant({
        ...restData,
        openTime: openTime,
        closeTime: closeTime,
        partner: id,
      });
      await partnerRepository.saveRestaurant(newRest);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  fetchCuisines: async () => {
    try {
      return await partnerRepository.fetchAllCuisines();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  fetchRestaurants: async (number) => {
    try {
      const partner = await partnerRepository.findPartner(number);
      if (partner) {
        const id = partner._id;
        return await partnerRepository.fetchAllPartnerRestaurants(id);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  editRestaurant: async (data) => {
    try {
      const id = data._id;
      const existingRest = await partnerRepository.fetchRestaurant(id);
      const updatedField = {};
      for (const key in data) {
        if (key === "openTime" && existingRest[key] !== data[key]) {
          const openTime = moment.selectedTime(data[key]);
          updatedField[key] = openTime;
        } else if (key === "closeTime" && existingRest[key] !== data[key]) {
          const closeTime = moment.selectedTime(data[key]);
          updatedField[key] = closeTime;
        } else if (existingRest[key] !== data[key])
          updatedField[key] = data[key];
      }

      const imageUrlArray = data.imageURL || [];
      if (imageUrlArray.length > 0) {
        updatedField["$addToSet"] = { images: { $each: imageUrlArray } };
      }

      if (Object.keys(updatedField).length > 0)
        await partnerRepository.editRestaurant(updatedField, id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});