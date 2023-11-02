import {
  addingCategory,
  fetchAllCategory,
} from "../../../usecases/adminUseCases/adminCategoryUseCases.js";

export const addCategory = async (req, res) => {
  try {
    const result = await addingCategory(req.body.values);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const result = await fetchAllCategory();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};
