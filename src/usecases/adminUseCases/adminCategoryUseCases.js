import {
  deletecategory,
  findAllCategory,
  saveCategory,
} from "../../repositories/adminRepository.js";

export const addingCategory = async (category) => {
  try {
    const savedCategory = await saveCategory(category);
    if (saveCategory) {
      const category = savedCategory.category;
      return category;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllCategory = async () => {
  try {
    return await findAllCategory();
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (id) => {
  try {
    return await deletecategory(id);
  } catch (err) {
    console.log(err);
  }
};
