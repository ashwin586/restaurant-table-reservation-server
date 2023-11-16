import Partners from "../entities/Partners.js";
import Restaurants from "../entities/Restaurants.js";
import Cuisines from "../entities/cuisine.js";
import Categories from "../entities/menuCategories.js";
import Menu from "../entities/Menus.js";
import Bookings from "../entities/Booking.js";

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

export const saveRestaurant = async (data, id, openTime, closeTime) => {
  try {
    const newRestaurant = new Restaurants({
      name: data.name,
      cuisine: data.selectedCuisines,
      openTime: openTime,
      closeTime: closeTime,
      seats: data.seats,
      address: data.address,
      city: data.city,
      pinCode: data.pinCode,
      partner: id,
    });
    return await newRestaurant.save();
  } catch (err) {
    console.log(err);
  }
};

export const findAllCuisines = async () => {
  try {
    return await Cuisines.find();
  } catch (err) {
    console.log(err);
  }
};

export const allRestaurant = async (id) => {
  try {
    return await Restaurants.find({ partner: id }).populate("cuisine");
  } catch (err) {
    console.log(err);
  }
};

export const findRestaurant = async (id) => {
  try {
    return await Restaurants.findById(id);
  } catch (err) {
    console.log(err);
  }
};

export const saveEditedRestaurant = async (restaurant) => {
  try {
    return await restaurant.save();
  } catch (err) {
    console.log(err);
  }
};

export const findCategories = async () => {
  try {
    return await Categories.find();
  } catch (err) {
    console.log(err);
  }
};

export const savingMenu = async (data, id) => {
  try {
    const newMenu = new Menu({
      name: data.name,
      foodCategory: data.foodType,
      quantity: data.quantity,
      price: data.price,
      imageURL: data.imageURL,
      restaurant: id,
    });
    return await newMenu.save();
  } catch (err) {
    console.log(err);
  }
};

export const restaurantMenus = async (id) => {
  try {
    return await Menu.find({ restaurant: id }).populate("foodCategory");
  } catch (err) {
    console.log(err);
  }
};

export const saveEditedMenu = async (newMenu, id) => {
  try {
    return await Menu.findByIdAndUpdate(
      id,
      {
        $set: {
          name: newMenu.name,
          foodCategory: newMenu.category,
          quantity: newMenu.quantity,
          price: newMenu.price,
          imageURL: newMenu.imageURL,
        },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const findAllOrders = async (id) => {
  try {
    const orders = await Bookings.find({ restaurant: id })
      .populate("restaurant", "name")
      .populate("user", "name phoneNumber email")
      .populate({
        path: "cart.menu",
        model: "Menu",
        select: "name quantity price imageURL",
      });
    return orders;
    // console.log(JSON.stringify(orders, null, 2));
  } catch (err) {
    console.log(err);
  }
};
