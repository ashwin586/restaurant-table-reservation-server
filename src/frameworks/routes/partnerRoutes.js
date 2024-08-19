import { Router } from "express";
import { partnerAuthControllers } from "../controllers/partnerController/partnerAuthController.js";
import { partnerDashboardControllers } from "../controllers/partnerController/partnerDashboardController.js";
import { partnerMenuControllers } from "../controllers/partnerController/partnerMenuController.js";
import { decodePartnerToken, decodeToken } from "../middlewares/jwtAuth.js";
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

// * Auth Routes
partnerRoutes.post("/register", partnerAuthControllers.registerPartner);
partnerRoutes.post("/login", partnerAuthControllers.loginPartner);
partnerRoutes.post("/recover", partnerAuthControllers.recoverPassword);
// partnerRoutes.get("/getDetails", decodePartnerToken, getPartner);
// partnerRoutes.put("/editPartner", decodePartnerToken, partnerEditController);

// partnerRoutes.post("/addRestaurant", decodePartnerToken, createRestaurant);
// partnerRoutes.get("/getAllCuisines", decodePartnerToken, fetchingCuisines);

// partnerRoutes.get("/getPartnerRestaurant", decodePartnerToken, fetchRestaurant);
// partnerRoutes.put("/editRestaurant", decodePartnerToken, editRestaurant);

// * Menu Routes
partnerRoutes.get("/fetchCategories", decodePartnerToken, partnerMenuControllers.fetchAllCategories);
partnerRoutes.post("/addFood", decodePartnerToken, partnerMenuControllers.addFood);
partnerRoutes.get("/fetchAllMenus", decodePartnerToken, partnerMenuControllers.fetchAllMenus);
partnerRoutes.put("/editMenu", decodePartnerToken, partnerMenuControllers.editMenu);

// partnerRoutes.get(
//   "/getAllOrdersOfRestaurant",
//   decodePartnerToken,
//   fetchAllOrders
// );

// * Dashboard Routes
partnerRoutes.get("/dashboard", decodePartnerToken, partnerDashboardControllers.fetchDashboardDetails);

export default partnerRoutes;
