import {Router} from 'express';
import { emailVerify, login, newPassword, otpVerify, register } from '../controllers/userController/authController.js';
import { fetchProfile, userImage } from '../controllers/userController/profileController.js';
import { decodeToken } from '../../middlewares/jwtAuth.js';

const userRoute = Router();

userRoute.post('/registeruser', register);
userRoute.post('/login', login);
userRoute.post('/emailverify', emailVerify)
userRoute.post('/otpverify', otpVerify)
userRoute.post('/savenewpassword', newPassword)
userRoute.get('/getuserprofile', decodeToken, fetchProfile);
userRoute.post('/uploadProfilePicture', userImage)
export default userRoute;