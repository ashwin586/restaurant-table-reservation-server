import { findCategories, restaurantMenus, savingMenu } from "../../repositories/partnerRepository.js";

export const findAllCategories = async () => {
  try {
    return await findCategories();
  } catch (err) {
    console.log(err);
  }
};

export const addingFood = async (data, id) => {
  try {
    return await savingMenu(data, id)
  } catch (err) {
    console.log(err);
  }
};

export const findRestaurantMenus = async(id) => {
  try{
    return await restaurantMenus(id);
  }catch(err){
    console.log(err)
  }
}
