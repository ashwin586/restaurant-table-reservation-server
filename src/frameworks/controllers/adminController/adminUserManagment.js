import { adminUserUseCases } from "../../../domain/usecases/adminUseCases/adminUserUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminUserUseCasesInstance = adminUserUseCases(adminRepositoryInstance);

export const adminUserManagmentControllers = {
  fetchAllUsers: async (req, res) => {
    try {
      const response = await adminUserUseCasesInstance.fetchAllUsers();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  blockUser: async (req, res) => {
    try {
      const { id } = req.body;
      const { name } = await adminUserUseCasesInstance.blockUser(id);
      return res.status(200).json({ name: name });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  unBlockUser: async (req, res) => {
    try {
      const { id } = req.body;
      const { name } = await adminUserUseCasesInstance.unBlockUser(id);
      return res.status(200).json({ name: name });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};
