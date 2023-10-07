import dotenv from 'dotenv';
import {generateAdminToken} from '../../middlewares/jwtAuth.js';
dotenv.config();

export const adminLoginVerify = async(email, password) =>{
    try{
        if(email === process.env.ADMINEMAIL && password === process.env.ADMINPASSWORD){
            const adminToken = await generateAdminToken(email)
            return {message: 'Login Successfull', status: 200, adminToken}
        } else {
            throw new Error("Invalid email or password")
        }
    }catch(err){
        throw new Error(err.message)
    }
}
