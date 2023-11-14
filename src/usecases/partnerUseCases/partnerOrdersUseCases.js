import { findAllOrders } from "../../repositories/partnerRepository.js"

export const getAllOrders = async( number) => {
    try{
        const response = await findAllOrders(number);
    }catch(err){
        console.log(err)
    }
}