import {
  findCategories,
  restaurantMenus,
  saveEditedMenu,
  savingMenu,
} from "../../repositories/partnerRepository.js";

export const findAllCategories = async () => {
  try {
    return await findCategories();
  } catch (err) {
    console.log(err);
  }
};

export const addingFood = async (data, id) => {
  try {
    return await savingMenu(data, id);
  } catch (err) {
    console.log(err);
  }
};

export const findRestaurantMenus = async (id) => {
  try {
    return await restaurantMenus(id);
  } catch (err) {
    console.log(err);
  }
};

export const editMenu = async (data) => {
  try {
    const id = data.id;
    const result = await saveEditedMenu(data, id);
    if (result) {
      return true;
    } else {
      throw new Error("Something went Wrong");
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
