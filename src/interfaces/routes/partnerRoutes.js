import {Router} from 'express';
import { partnerLogin, partnerRegister } from '../controllers/partnerController/partnerAuthController.js';
import { decodePartnerToken, decodeToken } from '../../middlewares/jwtAuth.js';
import { getPartner } from '../controllers/partnerController/partnerProfieController.js';
import { createRestaurant } from '../controllers/partnerController/partnerRestaurantController.js';

const partnerRoutes = Router();

partnerRoutes.post('/register', partnerRegister)
partnerRoutes.post('/login', partnerLogin);
partnerRoutes.get('/getDetails', decodePartnerToken, getPartner)

partnerRoutes.post('/addRestaurant', decodePartnerToken, createRestaurant);

export default partnerRoutes