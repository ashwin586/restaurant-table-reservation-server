import { fetchRestaurants } from "../../../usecases/adminUseCases/adminRestaurantUseCases.js"

export const getAllRestaurant = async(req, res) => {
    try{
        const restaurants = await fetchRestaurants();
        return res.status(200).json(restaurants)
    }catch(err){
        console.log(err)
    }
}