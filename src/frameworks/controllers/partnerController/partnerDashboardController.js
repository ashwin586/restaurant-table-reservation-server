import { partnerDashboardUseCases } from "../../../domain/usecases/partnerUseCases/partnerDashboardUseCases.js";
import { partnerRepository } from "../../../infrastructure/repositories/partnerRepository.js";
import { partnerRepositoryInterface } from "../../../domain/repositories/partnerRepository.js";

const partnerRepositoryInstance = partnerRepositoryInterface(partnerRepository);
const partnerDashboardUseCasesInstance = partnerDashboardUseCases(
  partnerRepositoryInstance
);

export const partnerDashboardControllers = {
  fetchDashboardDetails: async (req, res) => {
    try {
      const data = req.token.number;
      const result =
        await partnerDashboardUseCasesInstance.fetchDashboardDetails(data);
      if (result) {
        return res.status(200).json({
          totalRevenue: result.totalRevenue,
          totalRestaurants: result.totalRestaurants,
          totalReviewCount: result.totalReviewCount,
          totalBookingCount: result.totalBookingCount,
          chartData: result.chartDetails,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(err.message);
    }
  },
};
