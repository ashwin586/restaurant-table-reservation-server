import {Router} from  'express';
import { adminLogin } from '../controllers/adminController/AdminAuthController.js';
import { findUsers, blockUser, unBlockUser } from '../controllers/adminController/adminUserManagment.js';

const adminRoutes = Router()

adminRoutes.post('/login', adminLogin);
adminRoutes.get('/getUserData', findUsers);

adminRoutes.put('/blockUser', blockUser);
adminRoutes.put('/unBlockUser', unBlockUser);

export default adminRoutes;