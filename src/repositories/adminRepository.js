import Partners from "../entities/Partners.js";
import Restaurants from "../entities/Restaurants.js";
import Cuisines from "../entities/cuisine.js";

export const findAllPartners = async () => {
  try {
    return await Partners.find().lean();
  } catch (err) {
    console.log(err);
  }
};

export const findPartnerWithId = async (id) => {
  try {
    return await Partners.findById(id);
  } catch (err) {
    console.log(err);
  }
};

export const savePartner = async (partner) => {
  try {
    return await partner.save();
  } catch (err) {
    console.log(err);
  }
};

export const findAllRestaurants = async () => {
  try {
    return await Restaurants.find().populate("partner");
  } catch (err) {
    console.log(err);
  }
};

export const findRestaurantWithId = async (id) => {
  try {
    return await Restaurants.findById(id);
  } catch (err) {
    console.log(err);
  }
};

export const saveRestaurant = async (restaurant) => {
  try {
    return restaurant.save();
  } catch (err) {
    console.log(err);
  }
};

export const findAllCuisine = async () => {
  try {
    return Cuisines.find();
  } catch (err) {
    console.log(err);
  }
};

export const registerCuisine = async (cuisine) => {
  try {
    const Cuisine = new Cuisines({
      cuisine: cuisine,
    });
    return await Cuisine.save();
  } catch (err) {
    console.log(err);
  }
};

export const findCuisineWithName = async (cuisine) => {
  try {
    return Cuisines.findOne({ cuisine: cuisine });
  } catch (err) {
    console.log(err);
  }
};

export const findAndDeleteCuisine = async(id) => {
  try{
    return await Cuisines.findByIdAndDelete(id)
  }catch(err){
    console.log(err)
  }
}
