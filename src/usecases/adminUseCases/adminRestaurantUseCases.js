import {
  findAllRestaurants,
  findRestaurantWithId,
  saveRestaurant,
} from "../../repositories/adminRepository.js";

export const fetchRestaurants = async () => {
  try {
    return await findAllRestaurants();
  } catch (err) {
    console.log(err);
  }
};

export const unlist = async (id) => {
  try {
    const restaurant = await findRestaurantWithId(id);
    if (restaurant) {
      restaurant.isBlocked = true;
      return await saveRestaurant(restaurant);
    }
  } catch (err) {
    console.log(err);
  }
};

export const list = async (id) => {
  try {
    const restaurant = await findRestaurantWithId(id);
    if (restaurant) {
      restaurant.isBlocked = false;
      return await saveRestaurant(restaurant);
    }
  } catch (err) {
    console.log(err);
  }
};
