import { findCuisineWithName, registerCuisine } from "../../repositories/adminRepository.js";

export const addingCuisine = async (cuisine) => {
  try {
    const exisitingCuisine = await findCuisineWithName(cuisine)
    if(exisitingCuisine) throw new Error('Cuisine already exisits');
    const result = registerCuisine(cuisine)
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
};
