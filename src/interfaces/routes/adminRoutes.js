import { Router } from "express";
import {
  adminLogin,
  adminSignUp,
} from "../controllers/adminController/AdminAuthController.js";
import {
  findUsers,
  blockUser,
  unBlockUser,
} from "../controllers/adminController/adminUserManagment.js";

import { adminCheck } from "../../middlewares/jwtAuth.js";

import {
  blockPartner,
  getPartners,
  unbockPartner,
} from "../controllers/adminController/adminPartnerManagment.js";

import {
  approveRestaurant,
  getAllRestaurant,
  listRestaurant,
  unlistRestaurant,
} from "../controllers/adminController/AdminRestaurantManagment.js";

import {
  addCusines,
  deleteCuisine,
  findAllCuisines,
} from "../controllers/adminController/AdminCusinesController.js";
import {
  addCategory,
  getAllCategory,
  removeCategory,
} from "../controllers/adminController/AdminCategoryController.js";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.post("/signup", adminSignUp);
adminRoutes.get("/getUserData", adminCheck, findUsers);

adminRoutes.put("/blockUser", adminCheck, blockUser);
adminRoutes.put("/unBlockUser", adminCheck, unBlockUser);

adminRoutes.get("/getPartnersData", adminCheck, getPartners);
adminRoutes.put("/blockPartner", adminCheck, blockPartner);
adminRoutes.put("/unBlockPartner", adminCheck, unbockPartner);

adminRoutes.get("/getAllRestaurants", adminCheck, getAllRestaurant);
adminRoutes.put("/unlistRestaurant", adminCheck, unlistRestaurant);
adminRoutes.put("/listRestaurant", adminCheck, listRestaurant);
adminRoutes.put("/restaurantApprove", adminCheck, approveRestaurant);
adminRoutes.put("/restaurantReject", adminCheck);

adminRoutes.post("/addcusines", adminCheck, addCusines);
adminRoutes.get("/getAllCusinies", adminCheck, findAllCuisines);
adminRoutes.delete("/deleteCuisine", adminCheck, deleteCuisine);

adminRoutes.post("/addCategory", adminCheck, addCategory);
adminRoutes.get("/getAllCategory", adminCheck, getAllCategory);
adminRoutes.delete("/deleteCategory", adminCheck, removeCategory);

export default adminRoutes;
