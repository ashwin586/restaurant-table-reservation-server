import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";
import { adminDashboardUseCases } from "../../../domain/usecases/adminUseCases/adminDashboardUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminDashboardUseCasesInstance = adminDashboardUseCases(
  adminRepositoryInstance
);

export const adminDashboardController = {
  fetchDashboardDetails: async (req, res) => {
    try {
      const  email = req.token;
      const response = await adminDashboardUseCasesInstance.dashboardDetails(
        email
      );
      return res.status(200).json({
        users: response.users,
        restaurants: response.restaurants,
        partners: response.partners,
        revenue: response.revenue,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};