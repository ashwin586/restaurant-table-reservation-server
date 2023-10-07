import Jwt from 'jsonwebtoken';

export const generateAdminToken = async(email) => {
    try{
        return Jwt.sign(email, process.env.JWTSECRETKEY);
    }catch(err){
        console.log(err)
    }
}