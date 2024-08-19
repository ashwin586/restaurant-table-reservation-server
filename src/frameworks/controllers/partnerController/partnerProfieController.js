import { partnerProfileUseCases } from "../../../domain/usecases/partnerUseCases/partnerProfileUseCases.js";
import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";

import * as bcrypt from "../../../infrastructure/services/bcrypt.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerUseCasesInstance = partnerProfileUseCases(
  partnerRepositoryInstance,
  bcrypt
);

export const partnerProfileControllers = {
  fetchPartner: async (req, res) => {
    try {
      const { number } = req.token;
      const partner = await partnerUseCasesInstance.fetchPartner(number);
      return res.status(200).json({ partner });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  editPartner: async (req, res) => {
    try {
      const { number } = req.token;
      const data = req.body;
      await partnerUseCasesInstance.editPartner(data, number);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
