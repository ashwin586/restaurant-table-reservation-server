import { verifyLogin, verifyRegister } from "../../../usecases/partnerUseCases/partnerAuthUseCase.js";

export const partnerRegister = async (req, res) => {
    try{
        const result = await verifyRegister(req.body.values)
        return res.status(200).json({message: 'Registration successfull'});
    }catch(err){
        console.log(err)
        return res.status(400).json(err.message);
    }
}

export const partnerLogin = async (req, res) =>{
    try{
        const response = await verifyLogin(req.body);
        if(response){
            return res.status(200).json({partnerToken: response});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({message: err.message});
    }
}