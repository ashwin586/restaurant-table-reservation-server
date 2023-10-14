import {Router} from 'express';
import { emailVerify, login, newPassword, otpVerify, register } from '../controllers/userController/authController.js';

const userRoute = Router();

userRoute.post('/registeruser', register);
userRoute.post('/login', login);
userRoute.post('/emailverify', emailVerify)
userRoute.post('/otpverify', otpVerify)
userRoute.post('/savenewpassword', newPassword)
export default userRoute;