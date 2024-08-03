import {
  findRestById,
  restaurantMenus,
  restaurantReviews,
} from "../../../infrastructure/repositories/userRepository.js";

export const fetchRestaurant = async (id) => {
  try {
    const restaurantDetails = await findRestById(id);
    const menus = await restaurantMenus(id);
    const reviews = await restaurantReviews(id);
    return { restaurantDetails, menus, reviews };
  } catch (err) {
    console.log(err);
  }
};
