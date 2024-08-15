export const partnerDashboardUseCases = (partnerRepository) => ({
  fetchDashboardDetails: async (data) => {
    try {
      const partner = await partnerRepository.findPartner(data);
      const partnerId = partner._id;
      const totalRevenue = partner.revenue;
      const restaurants = await partnerRepository.fetchAllPartnerRestaurants(
        partnerId
      );
      const restaurantIds = restaurants.map((restaurant) => restaurant._id);
      const totalRestaurants = restaurants.length;
      const totalReviewCount = await partnerRepository.fetchRestsTotalReviews(
        restaurantIds
      );
      const totalBookingCount = await partnerRepository.fetchRestsTotalBooking(
        restaurantIds
      );
      const chartDetails = await partnerRepository.fetchRestsChartData(
        restaurantIds
      );
      return {
        totalRevenue,
        totalRestaurants,
        totalReviewCount,
        totalBookingCount,
        chartDetails,
      };
    } catch (error) {
      console.log(error);
    }
  },
});
