import { Router } from "express";
import { adminLogin } from "../controllers/adminController/AdminAuthController.js";
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
  getAllRestaurant,
  listRestaurant,
  unlistRestaurant,
} from "../controllers/adminController/AdminRestaurantManagment.js";

import { addCusines, deleteCuisine, findAllCuisines } from "../controllers/adminController/AdminCusinesController.js";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.get("/getUserData", adminCheck, findUsers);

adminRoutes.put("/blockUser", adminCheck, blockUser);
adminRoutes.put("/unBlockUser", adminCheck, unBlockUser);

adminRoutes.get("/getPartnersData", adminCheck, getPartners);
adminRoutes.put("/blockPartner", adminCheck, blockPartner);
adminRoutes.put("/unBlockPartner", adminCheck, unbockPartner);

adminRoutes.get("/getAllRestaurants", adminCheck, getAllRestaurant);
adminRoutes.put("/unlistRestaurant", adminCheck, unlistRestaurant);
adminRoutes.put("/listRestaurant", adminCheck, listRestaurant);

adminRoutes.post("/addcusines", adminCheck, addCusines);
adminRoutes.get('/getAllCusinies', adminCheck, findAllCuisines);

adminRoutes.delete('/deleteCuisine', adminCheck, deleteCuisine)

export default adminRoutes;
