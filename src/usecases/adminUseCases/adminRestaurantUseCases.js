import { findAllRestaurants } from "../../repositories/adminRepository.js";

export const fetchRestaurants = async () => {
    try{
        return await findAllRestaurants();
    }catch(err){
        console.log(err);
    }
}