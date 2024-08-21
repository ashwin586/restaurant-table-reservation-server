import { adminRestaurantUseCases } from "../../../domain/usecases/adminUseCases/adminRestaurantUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminRestaurantUseCasesInstance = adminRestaurantUseCases(
  adminRepositoryInstance
);

export const adminRestaurantManagmentControllers = {
  fetchAllRestaurants: async (req, res) => {
    try {
      const response =
        await adminRestaurantUseCasesInstance.fetchAllRestaurant();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  unlistRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      await adminRestaurantUseCasesInstance.unlistRestaurant(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  listRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      await adminRestaurantUseCasesInstance.listRestaurant(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  approveRestaurant: async (req, res) => {
    try {
      const { id } = req.body.id;
      await adminRestaurantUseCasesInstance.approveRestaurant(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  rejectRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      await adminRestaurantUseCasesInstance.rejectRestaurant(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
