import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAdminToken = async(email) => {
    try{
        return Jwt.sign(email, process.env.JWTSECRETKEY);
    }catch(err){
        console.log(err)
    }
}

export const adminCheck = async(req, res, next) =>{
    const token = req.headers.authorization?.trim().split(' ')[1];
    if(!token){
        res.status(401).json({message: 'Unauthorised Access'});
    } else {
        try{
            Jwt.verify(token, process.env.JWTSECRETKEY);
            next();
        }catch(err){
            console.log(err);
        }
    }
}