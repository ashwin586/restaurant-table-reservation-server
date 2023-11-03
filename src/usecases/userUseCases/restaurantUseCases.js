import { findRestById } from "../../repositories/userRepository.js";

export const fetchRestaurant = async (id) => {
  try {
    return await findRestById(id);
  } catch (err) {
    console.log(err);
  }
};
