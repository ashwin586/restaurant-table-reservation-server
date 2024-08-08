import { Router } from "express";
import {
  checkUserStatus,
  emailVerify,
  otpVerify,
  sendOtp,
} from "../controllers/userController/authController.js";
import { decodeToken } from "../middlewares/jwtAuth.js";

import { userAuthControllers } from "../controllers/userController/authController.js";
import { userProfileControllers } from "../controllers/userController/profileController.js";
import { userRestaurantControllers } from "../controllers/userController/restaurantController.js";
import { userBookingControllers } from "../controllers/userController/bookingController.js";

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
userRoute.get("/getuserprofile", decodeToken, userProfileControllers.fetchProfile);
userRoute.post("/uploadProfilePicture", decodeToken, userProfileControllers.editUserImage);
userRoute.put("/editUser", decodeToken, userProfileControllers.editUser);
userRoute.get("/getBookings", decodeToken, userProfileControllers.fetchBookings);
userRoute.get("/fetchReview", decodeToken, userProfileControllers.fetchReview);
userRoute.get("/fetchReviews", decodeToken, userProfileControllers.fetchReviews);

userRoute.get("/getAllRestaurants", userRestaurantControllers.findAllRestaurants);
userRoute.get("/getRestaurantDetails", userRestaurantControllers.findRestaurant);

userRoute.get("/seatAvailablity", userBookingControllers.checkAvailablity);
userRoute.put("/bookingCancel", decodeToken, userBookingControllers.cancelBooking);
userRoute.post("/bookingTable", decodeToken, userBookingControllers.bookingTable);
userRoute.post("/userReview", decodeToken, userBookingControllers.userReview);


export default userRoute;
