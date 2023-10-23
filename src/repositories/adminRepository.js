import Partners from "../entities/Partners.js";
import Restaurants from "../entities/Restaurants.js";

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
