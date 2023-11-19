import {
  allRestaurant,
  findAllCuisines,
  findPartner,
  findRestaurant,
  saveEditedRestaurant,
  saveRestaurant,
} from "../../repositories/partnerRepository.js";
import { selectedTime } from "../../services/moment.js";

export const newRestaurant = async (restaurantData, number) => {
  try {
    const partner = await findPartner(number);
    const id = partner._id;
    const openTime = selectedTime(restaurantData.openTime);
    const closeTime = selectedTime(restaurantData.closeTime);
    return await saveRestaurant(restaurantData, id, openTime, closeTime);
  } catch (err) {
    console.log(err);
  }
};

export const allCuisines = async () => {
  try {
    return await findAllCuisines();
  } catch (err) {
    console.log(err);
  }
};

export const partnerRestaurant = async (phone) => {
  try {
    const partner = await findPartner(phone);
    if (partner) {
      const id = partner._id;
      return await allRestaurant(id);
    }
  } catch (err) {
    console.log(err);
  }
};

export const alterRestaurant = async (data) => {
  try {
    const response = await saveEditedRestaurant(data);
    if(response){
      return true
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
