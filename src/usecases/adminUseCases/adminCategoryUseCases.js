import { findAllCategory, saveCategory } from "../../repositories/adminRepository.js";

export const addingCategory = async (category) => {
  try {
    const savedCategory = await saveCategory(category);
    return saveCategory;
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
