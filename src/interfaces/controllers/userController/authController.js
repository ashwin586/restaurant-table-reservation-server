import { userData, checkUserInfo } from "../../../usecases/userUseCases/authUseCase.js";

export const register = async (req, res) =>{
    try{
        const {name, phoneNumber, email, password} = req.body;
        const userDetails = {
            name,
            phoneNumber,
            email,
            password
        }
        const response = await userData(userDetails); 
        if(response){
            return res.status(200).end()
        }
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}


export const login = async(req, res) =>{
    try{
        const response = await checkUserInfo(req.body);
        if(response){
            return res.status(200).end();
        }
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}