import { Router } from "express";

import { adminAuthControllers } from "../controllers/adminController/AdminAuthController.js";
import { adminDashboardController } from "../controllers/adminController/adminDashboardController.js";
import { adminCategoryController } from "../controllers/adminController/AdminCategoryController.js";
import { adminCusinesController } from "../controllers/adminController/AdminCusinesController.js";

import { adminCheck } from "../middlewares/jwtAuth.js";

// import {
//   findUsers,
//   blockUser,
//   unBlockUser,
// } from "../controllers/adminController/adminUserManagment.js";

// import {
//   blockPartner,
//   getPartners,
//   unbockPartner,
// } from "../controllers/adminController/adminPartnerManagment.js";

// import {
//   approveRestaurant,
//   getAllRestaurant,
//   listRestaurant,
//   unlistRestaurant,
// } from "../controllers/adminController/AdminRestaurantManagment.js";

// import {
//   addCusines,
//   deleteCuisine,
//   findAllCuisines,
// } from "../controllers/adminController/AdminCusinesController.js";


const adminRoutes = Router();

adminRoutes.post("/login", adminAuthControllers.adminLogin);
// adminRoutes.post("/signup", adminSignUp);
// adminRoutes.get("/getUserData", adminCheck, findUsers);

// adminRoutes.put("/blockUser", adminCheck, blockUser);
// adminRoutes.put("/unBlockUser", adminCheck, unBlockUser);

// adminRoutes.get("/getPartnersData", adminCheck, getPartners);
// adminRoutes.put("/blockPartner", adminCheck, blockPartner);
// adminRoutes.put("/unBlockPartner", adminCheck, unbockPartner);

// adminRoutes.get("/getAllRestaurants", adminCheck, getAllRestaurant);
// adminRoutes.put("/unlistRestaurant", adminCheck, unlistRestaurant);
// adminRoutes.put("/listRestaurant", adminCheck, listRestaurant);
// adminRoutes.put("/restaurantApprove", adminCheck, approveRestaurant);
// adminRoutes.put("/restaurantReject", adminCheck);

// * Cuisines Routes
adminRoutes.post("/addcusines", adminCheck, adminCusinesController.addCuisine);
adminRoutes.get("/getAllCusinies", adminCheck, adminCusinesController.fetchAllCuisines);
adminRoutes.delete("/deleteCuisine", adminCheck, adminCusinesController.removeCuisine);

// * Category Routes
adminRoutes.post("/addCategory", adminCheck, adminCategoryController.addCategory);
adminRoutes.get("/getAllCategory", adminCheck, adminCategoryController.fetchAllCategories);
adminRoutes.delete("/deleteCategory", adminCheck, adminCategoryController.removeCategory);

// * Dashboard details Routes
adminRoutes.get('/dashboard', adminCheck, adminDashboardController.fetchDashboardDetails)
export default adminRoutes;
