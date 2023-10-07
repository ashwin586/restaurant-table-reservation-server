import { blockuser, findAllUsers, unblockuser } from "../../../usecases/adminUseCases/adminUserUseCases.js";

export const findUsers = async(req, res) => {
    try{
        const response = await findAllUsers();
        return res.json(response);
    }catch(err){
        console.log(err);
    }
}

export const blockUser = async (req, res) => {
    try{
        const {id} = req.body
        const result = await blockuser(id);
        return res.status(200).json({name: result.name});
    }catch(err){
        console.log(err);
    }
}

export const unBlockUser = async (req, res) => {
    try{
        const {id} = req.body;
        const result = await unblockuser(id)
        return res.status(200).json({name: result.name});
    }catch(err){
        console.log(err);
    }
}