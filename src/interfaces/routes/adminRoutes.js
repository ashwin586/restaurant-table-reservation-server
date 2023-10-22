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
import { getAllRestaurant } from "../controllers/adminController/AdminRestaurantManagment.js";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.get("/getUserData", adminCheck, findUsers);

adminRoutes.put("/blockUser", adminCheck, blockUser);
adminRoutes.put("/unBlockUser", adminCheck, unBlockUser);

adminRoutes.get("/getPartnersData", adminCheck, getPartners);
adminRoutes.put("/blockPartner", adminCheck, blockPartner);
adminRoutes.put("/unBlockPartner", adminCheck, unbockPartner);

adminRoutes.get('/getAllRestaurants', adminCheck, getAllRestaurant);

export default adminRoutes;
