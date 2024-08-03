// import {
//   findAllRestaurants,
//   findRestaurantWithId,
//   saveRestaurant,
// } from "../../repositories/adminRepository.js";

// export const fetchRestaurants = async () => {
//   try {
//     return await findAllRestaurants();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const unlist = async (id) => {
//   try {
//     const restaurant = await findRestaurantWithId(id);
//     if (restaurant) {
//       restaurant.isBlocked = true;
//       return await saveRestaurant(restaurant);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const list = async (id) => {
//   try {
//     const restaurant = await findRestaurantWithId(id);
//     if (restaurant) {
//       restaurant.isBlocked = false;
//       return await saveRestaurant(restaurant);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const approve = async (id) => {
//   try {
//     const restaurant = await findRestaurantWithId(id);
//     if (restaurant) {
//       restaurant.isApproved = "Approved";
//       await saveRestaurant(restaurant);
//       return true;
//     } else {
//       throw new Error("Something went wrong");
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error(err.message);
//   }
// };

// export const reject = async(id) => {
//   try{
//     const restaurant = await findRestaurantWithId(id);
//     if(restaurant){
//       restaurant.isApproved = 'Rejected'
//       await saveRestaurant(restaurant);
//       return true
//     } else {
//       throw new Error('Something went wrong');
//     }
//   }catch(err){
//     console.log(err)
//     throw new Error(err.message);
//   }
// }