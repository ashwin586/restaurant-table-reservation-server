import { Router } from "express";
import { partnerAuthControllers } from "../controllers/partnerController/partnerAuthController.js";
import { partnerDashboardControllers } from "../controllers/partnerController/partnerDashboardController.js";
import { partnerMenuControllers } from "../controllers/partnerController/partnerMenuController.js";
import { partnerOrderControllers } from "../controllers/partnerController/partnerOrderController.js";
import { partnerProfileControllers } from "../controllers/partnerController/partnerProfieController.js";
import { partnerRestaurantControllers } from "../controllers/partnerController/partnerRestaurantController.js";
import { decodePartnerToken } from "../middlewares/jwtAuth.js";

const partnerRoutes = Router();

// * Auth Routes
partnerRoutes.post("/register", partnerAuthControllers.registerPartner);
partnerRoutes.post("/login", partnerAuthControllers.loginPartner);
partnerRoutes.post("/recover", partnerAuthControllers.recoverPassword);


// * Profile Routes
partnerRoutes.get("/getDetails", decodePartnerToken, partnerProfileControllers.fetchPartner);
partnerRoutes.put("/editPartner", decodePartnerToken, partnerProfileControllers.editPartner);


// * Restaurant Routes
partnerRoutes.post("/addRestaurant", decodePartnerToken, partnerRestaurantControllers.createRestaurant);
partnerRoutes.get("/getAllCuisines", decodePartnerToken, partnerRestaurantControllers.fetchCuisines);
partnerRoutes.get("/getPartnerRestaurant", decodePartnerToken, partnerRestaurantControllers.fetchRestaurants);
partnerRoutes.put("/editRestaurant", decodePartnerToken, partnerRestaurantControllers.editRestaurant);


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
