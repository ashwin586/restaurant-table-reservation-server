// import {
//   addingFood,
//   editMenu,
//   findAllCategories,
//   findRestaurantMenus,
// } from "../../../usecases/partnerUseCases/partnerMenuUseCases.js";

// export const fetchAllCategories = async (req, res) => {
//   try {
//     const result = await findAllCategories();
//     if (result) {
//       return res.status(200).json(result);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addFood = async (req, res) => {
//   try {
//     const result = await addingFood(req.body.values, req.body.isId);
//     if (result) {
//       return res.status(200).json(result);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const findAllMenus = async (req, res) => {
//   try {
//     const result = await findRestaurantMenus(req.query.id);
//     if (result) {
//       return res.status(200).json(result);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const editedMenu = async (req, res) => {
//   try {
//     const result = await editMenu(req.body);
//     if (result) {
//       return res.status(200).end();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
