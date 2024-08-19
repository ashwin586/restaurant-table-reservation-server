import { partnerOrderUseCases } from "../../../domain/usecases/partnerUseCases/partnerOrdersUseCases.js";
import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerOrdersUseCasesInstance = partnerOrderUseCases(
  partnerRepositoryInstance
);

export const partnerOrderControllers = {
  fetchRestOrders: async (req, res) => {
    try {
      const id = req.query.id;
      const response = await partnerOrdersUseCasesInstance.fetchRestOrders(id);
      return res.staus(200).json(response);
    } catch (error) {
      console.log(error);
      return res.staut(400).json(error.message);
    }
  },
};
