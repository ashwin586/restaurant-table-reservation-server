import { findRestaurants } from "../../repositories/userRepository.js";

export const fetchAllRestaurants = async () => {
  try {
    return await findRestaurants();
  } catch (err) {
    console.log(err);
  }
};
