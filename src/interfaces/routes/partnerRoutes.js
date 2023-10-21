import {Router} from 'express';
import { partnerLogin, partnerRegister } from '../controllers/partnerController/authentication/partnerAuthController.js';

const partnerRoutes = Router();

partnerRoutes.post('/register', partnerRegister)
partnerRoutes.post('/login', partnerLogin)

export default partnerRoutes