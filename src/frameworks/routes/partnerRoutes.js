import { Router } from "express";
import { partnerAuthControllers } from "../controllers/partnerController/partnerAuthController.js";
// import { decodePartnerToken, decodeToken } from "../middlewares/jwtAuth.js";
// import {
//   getPartner,
//   partnerEditController,
// } from "../controllers/partnerController/partnerProfieController.js";
// import {
//   createRestaurant,
//   editRestaurant,
//   fetchRestaurant,
//   fetchingCuisines,
// } from "../controllers/partnerController/partnerRestaurantController.js";
// import {
//   addFood,
//   editedMenu,
//   fetchAllCategories,
//   findAllMenus,
// } from "../controllers/partnerController/partnerMenuController.js";
// import { fetchAllOrders } from "../controllers/partnerController/partnerOrderController.js";
// import { fetchAllDetails } from "../controllers/partnerController/partnerDashboardController.js";

const partnerRoutes = Router();

partnerRoutes.post("/register", partnerAuthControllers.registerPartner);
partnerRoutes.post("/login", partnerAuthControllers.loginPartner);
partnerRoutes.post("/recover", partnerAuthControllers.recoverPassword);
// partnerRoutes.get("/getDetails", decodePartnerToken, getPartner);
// partnerRoutes.put("/editPartner", decodePartnerToken, partnerEditController);

// partnerRoutes.post("/addRestaurant", decodePartnerToken, createRestaurant);
// partnerRoutes.get("/getAllCuisines", decodePartnerToken, fetchingCuisines);

// partnerRoutes.get("/getPartnerRestaurant", decodePartnerToken, fetchRestaurant);
// partnerRoutes.put("/editRestaurant", decodePartnerToken, editRestaurant);

// partnerRoutes.get("/fetchCategories", decodePartnerToken, fetchAllCategories);

// partnerRoutes.post("/addFood", decodePartnerToken, addFood);
// partnerRoutes.get("/fetchAllMenus", decodePartnerToken, findAllMenus);
// partnerRoutes.put("/editMenu", decodePartnerToken, editedMenu);

// partnerRoutes.get(
//   "/getAllOrdersOfRestaurant",
//   decodePartnerToken,
//   fetchAllOrders
// );
// partnerRoutes.get("/dashboard", decodePartnerToken, fetchAllDetails);

export default partnerRoutes;
