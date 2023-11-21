import {
    chartDetails,
  partnerCount,
  restaurantOnline,
  totalrevenue,
  userCount,
} from "../../repositories/adminRepository.js";

export const dashBoard = async () => {
  try {
    const users = await userCount();
    const restaurants = await restaurantOnline();
    const revenue = await totalrevenue();
    const partners = await partnerCount();
    // const chartData = await chartDetails();
    return { users, restaurants, revenue, partners };
  } catch (err) {
    console.log(err);
  }
};
