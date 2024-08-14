import { partnerAuthUseCases } from "../../../domain/usecases/partnerUseCases/partnerAuthUseCase.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";
import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import * as bcrypt from "../../../infrastructure/services/bcrypt.js";
import * as jwt from "../../../infrastructure/services/tokenServices.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerAuthUseCasesInstance = partnerAuthUseCases(
  partnerRepositoryInstance,
  bcrypt,
  jwt
);

export const partnerAuthControllers = {
  registerPartner: async (req, res) => {
    try {
      const data = req.body;
      await partnerAuthUseCasesInstance.registerPartner(data);
      return res.status(200).json({ message: "Registration successfull" });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
  loginPartner: async (req, res) => {
    try {
      const data = req.body;
      const response = await partnerAuthUseCasesInstance.loginPartner(data);
      return res.status(200).json({ partnerToken: response });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
  recoverPassword: async (req, res) => {
    try {
      const data = req.body.phoneNumber;
      const response = await partnerAuthUseCasesInstance.recoverPassword(data);
      return res.status(200).json({ partnerToken: response });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
