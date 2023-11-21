import {
  allRestaurant,
  chartData,
  findPartner,
  partnerTotalReviewCount,
  totalBookings,
} from "../../repositories/partnerRepository.js";

export const dashboardDetails = async (number) => {
  try {
    const partner = await findPartner(number);
    const partnerId = partner._id;
    const totalRevenue = partner.revenue;
    const restaurants = await allRestaurant(partnerId);
    const restaurantIds = restaurants.map(restaurant => restaurant._id);
    const totalRestaurants = restaurants.length;
    const totalReviewCount = await partnerTotalReviewCount(restaurantIds);
    const totalBookingCount = await totalBookings(restaurantIds);
    const chartDetails = await chartData(restaurantIds);
    return {totalRevenue, totalRestaurants, totalReviewCount, totalBookingCount, chartDetails};
  } catch (err) {
    console.log(err);
  }
};
