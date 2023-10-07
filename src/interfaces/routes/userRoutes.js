import {Router} from 'express';
import { login, register } from '../controllers/userController/authController.js';

const userRoute = Router();

userRoute.post('/registeruser', register);
userRoute.post('/login', login);
export default userRoute;