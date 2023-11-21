import { findRestaurants } from "../../repositories/userRepository.js";

export const fetchAllRestaurants = async () => {
  try {
    const response = await findRestaurants();
    return response;
  } catch (err) {
    console.log(err);
  }
};
