export const adminDashboardUseCases = (adminRepository) => ({
  dashboardDetails: async (email) => {
    try {
      const admin = await adminRepository.findAdmin(email);
      if (!admin) throw new Error("Something went wrong");
      const users = await adminRepository.usersCount();
      const restaurants = await adminRepository.restaurantsCount();
      const revenue = admin.revenue;
      const partners = await adminRepository.partnersCount();
      return { users, restaurants, revenue, partners };
    } catch (error) {
      throw new Error(error);
    }
  },
});
