import { Router } from "express";
import {
  partnerLogin,
  partnerRegister,
} from "../controllers/partnerController/partnerAuthController.js";
import { decodePartnerToken, decodeToken } from "../../middlewares/jwtAuth.js";
import { getPartner } from "../controllers/partnerController/partnerProfieController.js";
import {
  createRestaurant,
  editRestaurant,
  fetchRestaurant,
  fetchingCuisines,
} from "../controllers/partnerController/partnerRestaurantController.js";
import {
  addFood,
  editedMenu,
  fetchAllCategories,
  findAllMenus
} from "../controllers/partnerController/partnerMenuController.js";

const partnerRoutes = Router();

partnerRoutes.post("/register", partnerRegister);
partnerRoutes.post("/login", partnerLogin);
partnerRoutes.get("/getDetails", decodePartnerToken, getPartner);

partnerRoutes.post("/addRestaurant", decodePartnerToken, createRestaurant);
partnerRoutes.get("/getAllCuisines", decodePartnerToken, fetchingCuisines);

partnerRoutes.get("/getPartnerRestaurant", decodePartnerToken, fetchRestaurant);
partnerRoutes.put("/editRestaurant", decodePartnerToken, editRestaurant);

partnerRoutes.get("/fetchCategories", decodePartnerToken, fetchAllCategories);

partnerRoutes.post("/addFood", decodePartnerToken, addFood);
partnerRoutes.get('/fetchAllMenus', decodePartnerToken, findAllMenus);
partnerRoutes.put('/editMenu', decodePartnerToken, editedMenu)
export default partnerRoutes;
