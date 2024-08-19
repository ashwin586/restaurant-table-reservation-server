import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import { partnerMenuUseCases } from "../../../domain/usecases/partnerUseCases/partnerMenuUseCases.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerMenuUseCasesInstance = partnerMenuUseCases(
  partnerRepositoryInstance
);

export const partnerMenuControllers = {
  fetchAllCategories: async (req, res) => {
    try {
      const response = await partnerMenuUseCasesInstance.fetchAllCategories();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  addFood: async (req, res) => {
    try {
      const data = req.body.values;
      const id = req.body.isId;
      const response = await partnerMenuUseCasesInstance.addFood(data, id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  fetchAllMenus: async (req, res) => {
    try {
      const restId = req.query.id;
      const response = await partnerMenuUseCasesInstance.fetchAllRestMenus(
        restId
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  editMenu: async (req, res) => {
    try {
      const data = req.body;
      await partnerMenuUseCasesInstance.editMenu(data);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
