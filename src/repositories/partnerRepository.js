import Partners from "../entities/Partners.js";
import Restaurants from "../entities/Restaurants.js";

export const savePartner = async (data, hashedPassword) => {
  try {
    const newPartner = new Partners({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });
    return await newPartner.save();
  } catch (err) {
    console.log(err);
  }
};

export const findPartner = async (phoneNumber) => {
  try {
    return await Partners.findOne({ phoneNumber: phoneNumber });
  } catch (err) {
    console.log(err);
  }
};

export const saveRestaurant = async (data, id) => {
  try {
    const newRestaurant = new Restaurants({
      name: data.name,
      cuisine: data.cuisine,
      openTime: data.openson,
      closeTime: data.closeson,
      address: data.address,
      partner: id,
    });
    return await newRestaurant.save();
  } catch (err) {
    console.log(err);
  }
};
