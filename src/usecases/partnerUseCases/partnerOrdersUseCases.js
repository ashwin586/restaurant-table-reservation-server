import { findAllOrders } from "../../repositories/partnerRepository.js"

export const getAllOrders = async( id) => {
    try{
        const response = await findAllOrders(id);
        if(response){
            return response
        }
    }catch(err){
        console.log(err)
    }
}