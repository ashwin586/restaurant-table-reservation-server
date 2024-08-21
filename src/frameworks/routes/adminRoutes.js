import { Router } from "express";

import { adminAuthControllers } from "../controllers/adminController/AdminAuthController.js";
import { adminDashboardController } from "../controllers/adminController/adminDashboardController.js";
import { adminCategoryController } from "../controllers/adminController/AdminCategoryController.js";
import { adminCusinesController } from "../controllers/adminController/AdminCusinesController.js";
import { adminPartnerManagmentControllers } from "../controllers/adminController/adminPartnerManagment.js";
import { adminUserManagmentControllers } from "../controllers/adminController/adminUserManagment.js";
import { adminRestaurantManagmentControllers } from "../controllers/adminController/AdminRestaurantManagment.js";

import { adminCheck } from "../middlewares/jwtAuth.js";


const adminRoutes = Router();

// * Auth Routes
adminRoutes.post("/login", adminAuthControllers.adminLogin);
// adminRoutes.post("/signup", adminSignUp);

// * User Management Routes
adminRoutes.get("/getUserData", adminCheck, adminUserManagmentControllers.fetchAllUsers);
adminRoutes.put("/blockUser", adminCheck, adminUserManagmentControllers.blockUser);
adminRoutes.put("/unBlockUser", adminCheck, adminUserManagmentControllers.unBlockUser);

// * Partner Management Routes
adminRoutes.get("/getPartnersData", adminCheck, adminPartnerManagmentControllers.fetchPartners);
adminRoutes.put("/blockPartner", adminCheck, adminPartnerManagmentControllers.blockPartner);
adminRoutes.put("/unBlockPartner", adminCheck, adminPartnerManagmentControllers.unBlockPartner);

// * Restaurant Management Routes
adminRoutes.get("/getAllRestaurants", adminCheck, adminRestaurantManagmentControllers.fetchAllRestaurants);
adminRoutes.put("/unlistRestaurant", adminCheck, adminRestaurantManagmentControllers.unlistRestaurant);
adminRoutes.put("/listRestaurant", adminCheck, adminRestaurantManagmentControllers.listRestaurant);
adminRoutes.put("/restaurantApprove", adminCheck, adminRestaurantManagmentControllers.approveRestaurant);
adminRoutes.put("/restaurantReject", adminCheck, adminRestaurantManagmentControllers.rejectRestaurant);

// * Cuisines Routes
adminRoutes.post("/addcusines", adminCheck, adminCusinesController.addCuisine);
adminRoutes.get("/getAllCusinies", adminCheck, adminCusinesController.fetchAllCuisines);
adminRoutes.delete("/deleteCuisine", adminCheck, adminCusinesController.removeCuisine);

// * Category Routes
adminRoutes.post("/addCategory", adminCheck, adminCategoryController.addCategory);
adminRoutes.get("/getAllCategory", adminCheck, adminCategoryController.fetchAllCategories);
adminRoutes.delete("/deleteCategory", adminCheck, adminCategoryController.removeCategory);

// * Dashboard details Routes
adminRoutes.get('/dashboard', adminCheck, adminDashboardController.fetchDashboardDetails);

export default adminRoutes;
