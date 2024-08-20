import { adminCategoryUseCases } from "../../../domain/usecases/adminUseCases/adminCategoryUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminCategoryUseCasesInstance = adminCategoryUseCases(
  adminRepositoryInstance
);

export const adminCategoryController = {
  addCategory: async (req, res) => {
    try {
      const data = req.body.values;
      const response = await adminCategoryUseCasesInstance.addCategory(data);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  fetchAllCategories: async (req, res) => {
    try {
      const response = await adminCategoryUseCasesInstance.fetchAllCategories();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  removeCategory: async (req, res) => {
    try {
      const {id} = req.body;
      console.log(id)
      await adminCategoryUseCasesInstance.removeCategory(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
