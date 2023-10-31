import { findAllCuisines, findPartner, saveRestaurant } from "../../repositories/partnerRepository.js";
import {selectedTime} from '../../services/moment.js';

export const newRestaurant = async (restaurantData, number) =>{
    try{
        const partner = await findPartner(number);
        const id = partner._id;
        const openTime = selectedTime(restaurantData.openTime)
        const closeTime = selectedTime(restaurantData.closeTime)
        console.log(openTime);
        return await saveRestaurant(restaurantData, id, openTime, closeTime);
    }catch(err){
        console.log(err);
    }
}

export const allCuisines = async () => {
    try{
        return await findAllCuisines();
    }catch(err){
        console.log(err)
    }
}