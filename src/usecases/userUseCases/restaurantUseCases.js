import { findRestById, restaurantMenus } from "../../repositories/userRepository.js";

export const fetchRestaurant = async (id) => {
  try {
    const restaurantDetails = await findRestById(id);
    const menus = await restaurantMenus(id);
    return {restaurantDetails, menus}
  } catch (err) {
    console.log(err);
  }
};


