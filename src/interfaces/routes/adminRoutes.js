import {Router} from  'express';
import { adminLogin } from '../controllers/adminController/AdminAuthController.js';
import { findUsers, blockUser, unBlockUser } from '../controllers/adminController/adminUserManagment.js';
import { adminCheck } from '../../middlewares/jwtAuth.js';

const adminRoutes = Router()

adminRoutes.post('/login', adminLogin);
adminRoutes.get('/getUserData', adminCheck, findUsers);

adminRoutes.put('/blockUser', adminCheck, blockUser);
adminRoutes.put('/unBlockUser', adminCheck, unBlockUser);

export default adminRoutes;