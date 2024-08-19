import { createMenu } from "../../entities/menus.js";

export const partnerMenuUseCases = (partnerRepository) => ({
  fetchAllCategories: async () => {
    try {
      return await partnerRepository.fetchAllCategories();
    } catch (error) {
      throw new Error(error);
    }
  },

  addFood: async (data, id) => {
    try {
      const newFood = createMenu({ ...data, restaurant: id });
      return await partnerRepository.addMenu(newFood);
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllRestMenus: async (restId) => {
    try {
      return await partnerRepository.fetchAllRestMenus(restId);
    } catch (error) {
      throw new Error(error);
    }
  },

  editMenu: async (data) => {
    try {
      const { id, ...newMenuData } = data;
      const existingMenu = await partnerRepository.findMenuById(id);
      if (!existingMenu) throw new Error("Menu Not Found");
      const updatedField = {};

      for (const key in newMenuData) {
        if (newMenuData[key] !== existingMenu[key])
          updatedField[key] = newMenuData[key];
      }

      if (Object.keys(updatedField).length > 0) {
        const response = await partnerRepository.editMenu(updatedField, id);
        if (response) return true;
        else throw new Error("Something went Wrong");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
});