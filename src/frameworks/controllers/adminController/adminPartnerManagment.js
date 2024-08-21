import { adminPartnerUseCases } from "../../../domain/usecases/adminUseCases/adminPartnerUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminPartnerUseCasesInstance = adminPartnerUseCases(
  adminRepositoryInstance
);

export const adminPartnerManagmentControllers = {
  fetchPartners: async (req, res) => {
    try {
      const response = await adminPartnerUseCasesInstance.fetchPartners();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  blockPartner: async (req, res) => {
    try {
      const { id } = req.body;
      await adminPartnerUseCasesInstance.blockPartner(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  unBlockPartner: async (req, res) => {
    try {
      const { id } = req.body;
      await adminPartnerUseCasesInstance.unBlockPartner(id);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
