import cuisine from "../../../infrastructure/models/cuisine.js";
import { createCuisine } from "../../entities/cuisine.js";

export const adminCuisinesUseCases = (adminRepository) => ({
  addCuisine: async (data) => {
    try {
      const existingCuisine = await adminRepository.findCuisine(data.cuisine);
      if (existingCuisine) throw new Error("Cuisine Already Exists");
      const newCuisine = createCuisine({ cuisine: data.cuisine });
      await adminRepository.saveCuisine(newCuisine);
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllCuisines: async () => {
    try {
      return await adminRepository.fetchAllCuisines();
    } catch (error) {
      throw new Error(error);
    }
  },

  removeCuisine: async (id) => {
    try {
      await adminRepository.deleteCuisine(id);
    } catch (error) {
      throw new Error(error);
    }
  },
});

// export const deletecuisine = async (id) => {
//   try{
//     return await findAndDeleteCuisine(id);
//   }catch(err){
//     console.log(err)
//   }
// }
