import { findPartner } from "../../repositories/partnerRepository.js";

export const fetchPartner = async(number) =>{
    try{
        return await findPartner(number);
    }catch(err){
        console.log(err);
    }
}