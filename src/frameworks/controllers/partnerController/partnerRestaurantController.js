import { partnerRestaurantUseCases } from "../../../domain/usecases/partnerUseCases/partnerRestaurantUseCases.js";
import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";
import * as moment from "../../../infrastructure/services/moment.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerRestaurantUseCasesInstance = partnerRestaurantUseCases(
  partnerRepositoryInstance,
  moment
);

export const partnerRestaurantControllers = {
  createRestaurant: async (req, res) => {
    try {
      const { number } = req.token;
      const data = req.body;
      await partnerRestaurantUseCasesInstance.createRestaurant(data, number);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  fetchCuisines: async (req, res) => {
    try {
      const response = await partnerRestaurantUseCasesInstance.fetchCuisines();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  fetchRestaurants: async (req, res) => {
    try {
      const { number } = req.token;
      const response = await partnerRestaurantUseCasesInstance.fetchRestaurants(
        number
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  editRestaurant: async (req, res) => {
    try {
      const data = req.body.values;
      await partnerRestaurantUseCasesInstance.editRestaurant(data);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
