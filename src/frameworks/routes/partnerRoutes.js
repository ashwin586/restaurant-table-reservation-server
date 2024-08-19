import { Router } from "express";
import { partnerAuthControllers } from "../controllers/partnerController/partnerAuthController.js";
import { partnerDashboardControllers } from "../controllers/partnerController/partnerDashboardController.js";
import { partnerMenuControllers } from "../controllers/partnerController/partnerMenuController.js";
import { partnerOrderControllers } from "../controllers/partnerController/partnerOrderController.js";
import { partnerProfileControllers } from "../controllers/partnerController/partnerProfieController.js";
import { decodePartnerToken, decodeToken } from "../middlewares/jwtAuth.js";

// import {
//   createRestaurant,
//   editRestaurant,
//   fetchRestaurant,
//   fetchingCuisines,
// } from "../controllers/partnerController/partnerRestaurantController.js";

const partnerRoutes = Router();

// * Auth Routes
partnerRoutes.post("/register", partnerAuthControllers.registerPartner);
partnerRoutes.post("/login", partnerAuthControllers.loginPartner);
partnerRoutes.post("/recover", partnerAuthControllers.recoverPassword);

partnerRoutes.get("/getDetails", decodePartnerToken, partnerProfileControllers.fetchPartner);
partnerRoutes.put("/editPartner", decodePartnerToken, partnerProfileControllers.editPartner);

// partnerRoutes.post("/addRestaurant", decodePartnerToken, createRestaurant);
// partnerRoutes.get("/getAllCuisines", decodePartnerToken, fetchingCuisines);

// partnerRoutes.get("/getPartnerRestaurant", decodePartnerToken, fetchRestaurant);
// partnerRoutes.put("/editRestaurant", decodePartnerToken, editRestaurant);

// * Menu Routes
partnerRoutes.get("/fetchCategories", decodePartnerToken, partnerMenuControllers.fetchAllCategories);
partnerRoutes.post("/addFood", decodePartnerToken, partnerMenuControllers.addFood);
partnerRoutes.get("/fetchAllMenus", decodePartnerToken, partnerMenuControllers.fetchAllMenus);
partnerRoutes.put("/editMenu", decodePartnerToken, partnerMenuControllers.editMenu);

// * Order Routes
partnerRoutes.get("/getAllOrdersOfRestaurant", decodePartnerToken, partnerOrderControllers.fetchRestOrders);

// * Dashboard Routes
partnerRoutes.get("/dashboard", decodePartnerToken, partnerDashboardControllers.fetchDashboardDetails);

export default partnerRoutes;
