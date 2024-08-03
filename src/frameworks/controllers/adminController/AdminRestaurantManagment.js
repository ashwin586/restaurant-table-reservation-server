// import {
//   approve,
//   fetchRestaurants,
//   list,
//   reject,
//   unlist,
// } from "../../../usecases/adminUseCases/adminRestaurantUseCases.js";

// export const getAllRestaurant = async (req, res) => {
//   try {
//     const restaurants = await fetchRestaurants();
//     return res.status(200).json(restaurants);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const unlistRestaurant = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await unlist(id);
//     return res.status(200).end();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const listRestaurant = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await list(id);
//     return res.status(200).end();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const approveRestaurant = async (req, res) => {
//   try {
//     const result = await approve(req.body.id);
//     if (result) {
//       return res.status(200).end();
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

// export const rejectRestaurant = async (req, res) => {
//   try {
//     const result = await reject(req.bosy.id);
//     if (result) {
//       return res.status(200).end();
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };
