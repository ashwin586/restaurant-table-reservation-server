import { allCuisines, newRestaurant } from "../../../usecases/partnerUseCases/partnerRestaurantUseCases.js"

export const createRestaurant = async (req, res) => {
    try{
        const {number} = req.token;
        await newRestaurant(req.body, number);
        return res.status(200).end();
    }catch(err){
        console.log(err)
    }
}

export const fetchingCuisines = async (req, res) => {
    try{
        const result = await allCuisines()
        return res.status(200).json({result});
    }catch(err){
        console.log(err)
    }
} 