import { createCategory } from "../../entities/menucategories.js";

export const adminCategoryUseCases = (adminRepository) => ({
  addCategory: async (data) => {
    try {
      const newCategory = createCategory(data);
      return await adminRepository.saveCategory(newCategory);
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllCategories: async () => {
    try {
      return await adminRepository.fetchAllCategory();
    } catch (error) {
      throw new Error(error);
    }
  },

  removeCategory: async (id) => {
    try {
      await adminRepository.deleteCategory(id);
    } catch (error) {
      throw new Error(error);
    }
  },
});
