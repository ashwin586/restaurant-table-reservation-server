import { Router } from "express";
import {
  checkUserStatus,
  editUser,
  emailVerify,
  otpVerify,
  sendOtp,
} from "../controllers/userController/authController.js";
import {
  fetchProfile,
  userImage,
} from "../controllers/userController/profileController.js";
import { decodeToken } from "../middlewares/jwtAuth.js";
import { findAllRestaurants } from "../controllers/userController/homeContoller.js";
import { findRestaurant } from "../controllers/userController/restaurantController.js";
import {
  bookingTable,
  cancelBooking,
  checkAvailablity,
  fetchReview,
  fetchReviews,
  getBookings,
  userReview,
} from "../controllers/userController/bookingController.js";

import { userAuthControllers } from "../controllers/userController/authController.js";

const userRoute = Router();

userRoute.post("/registeruser", userAuthControllers.register);
userRoute.post("/sendOtp", sendOtp);
userRoute.post("/login", userAuthControllers.login);
userRoute.post("/emailverify", emailVerify);
userRoute.post("/otpverify", otpVerify);
userRoute.post("/google/signup", userAuthControllers.googleRegister);
userRoute.post("/google/login", userAuthControllers.googleLogin);

userRoute.post("/forgotpassword", userAuthControllers.forgotPassword);
// userRoute.get("/checkuser", decodeToken, checkUserStatus);
userRoute.get("/getuserprofile", decodeToken, fetchProfile);
userRoute.post("/uploadProfilePicture", decodeToken, userImage);
userRoute.put("/editUser", decodeToken, editUser);

userRoute.get("/getAllRestaurants", findAllRestaurants);
userRoute.get("/getRestaurantDetails", findRestaurant);
userRoute.get("/seatAvailablity", checkAvailablity);
userRoute.get("/getBookings", decodeToken, getBookings);
userRoute.put("/bookingCancel", decodeToken, cancelBooking);

userRoute.post("/bookingTable", decodeToken, bookingTable);
userRoute.post("/userReview", decodeToken, userReview);
userRoute.get("/fetchReview", decodeToken, fetchReview);
userRoute.get("/fetchReviews", decodeToken, fetchReviews);

export default userRoute;
