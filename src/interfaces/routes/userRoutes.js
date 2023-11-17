import { Router } from "express";
import {
  emailVerify,
  googleLogin,
  googleRegister,
  login,
  newPassword,
  otpVerify,
  register,
  sendOtp,
} from "../controllers/userController/authController.js";
import {
  fetchProfile,
  userImage,
} from "../controllers/userController/profileController.js";
import { decodeToken } from "../../middlewares/jwtAuth.js";
import { findAllRestaurants } from "../controllers/userController/homeContoller.js";
import { findRestaurant } from "../controllers/userController/restaurantController.js";
import {
  bookingTable,
  getBookings,
} from "../controllers/userController/bookingController.js";

const userRoute = Router();

userRoute.post("/registeruser", register);
userRoute.post("/sendOtp", sendOtp);
userRoute.post("/login", login);
userRoute.post("/emailverify", emailVerify);
userRoute.post("/otpverify", otpVerify);
userRoute.post('/google/signup', googleRegister);
userRoute.post('/google/login', googleLogin);

userRoute.post("/savenewpassword", newPassword);
userRoute.get("/getuserprofile", decodeToken, fetchProfile);
userRoute.post("/uploadProfilePicture", decodeToken, userImage);

userRoute.get("/getAllRestaurants", findAllRestaurants);
userRoute.get("/getRestaurantDetails", findRestaurant);
userRoute.get("/getBookings", decodeToken, getBookings);

userRoute.post("/bookingTable", decodeToken, bookingTable);
export default userRoute;
