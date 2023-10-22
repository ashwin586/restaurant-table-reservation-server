import { findPartner, saveRestaurant } from "../../repositories/partnerRepository.js";

export const newRestaurant = async (restaurantData, number) =>{
    try{
        const partner = await findPartner(number);
        const id = partner._id;
        return await saveRestaurant(restaurantData, id);
    }catch(err){
        console.log(err);
    }
}