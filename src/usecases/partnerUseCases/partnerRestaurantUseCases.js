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
    console.log(openTime);
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
    const existingRestaurant = await findRestaurant(data._id);
    if (existingRestaurant) {
      existingRestaurant.name = data.name;
      existingRestaurant.cuisine = data.cuisine;
      existingRestaurant.openTime = data.opens;
      existingRestaurant.closeTime = data.closes;
      existingRestaurant.address = data.streetAddress;
      existingRestaurant.pinCode = data.pinCode;
      existingRestaurant.city = data.city;
      if (data.imageURl.length > 0) {
        data.imageURl.forEach((image) => {
          existingRestaurant.images.push(image);
        });
      }
      await saveEditedRestaurant(existingRestaurant);
      return true;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
