import { adminCuisinesUseCases } from "../../../domain/usecases/adminUseCases/adminCuisineUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";
import { response } from "express";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminCuisinesUseCasesInstace = adminCuisinesUseCases(
  adminRepositoryInstance
);

export const adminCusinesController = {
  addCuisine: async (req, res) => {
    try {
      const { values } = req.body;
      await adminCuisinesUseCasesInstace.addCuisine(values);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  fetchAllCuisines: async (req, res) => {
    try {
      const response = await adminCuisinesUseCasesInstace.fetchAllCuisines();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  removeCuisine: async (req, res) => {
    try {
      const { id } = req.body;
      await adminCuisinesUseCasesInstace.removeCuisine(id);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
// export const deleteCuisine = async (req, res) => {
//   try{
//     const {id} = req.body;
//     const result = await deletecuisine(id)
//     return res.status(200).json({result});
//   }catch(err){
//     console.log(err);
//   }
// }
