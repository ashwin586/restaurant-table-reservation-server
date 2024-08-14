import Partners from "../models/Partners.js";
import Restaurants from "../models/Restaurants.js";
import Cuisines from "../models/cuisine.js";
import Categories from "../models/menuCategories.js";
import Menu from "../models/Menus.js";
import Bookings from "../models/Booking.js";
import Reviews from "../models/Reviews.js";

export const partnerRepository = {
  savePartner: async (data) => {
    try {
      const partnerModel = new Partners(data);
      return await partnerModel.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  findPartner: async (phoneNumber) => {
    try {
      return await Partners.findOne({ phoneNumber: phoneNumber });
    } catch (error) {
      throw new Error(error);
    }
  },
};

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
      latitude: data.latitude,
      longitude: data.longitude,
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
    return await Restaurants.find({ partner: id })
      .populate("cuisine")
      .sort({ _id: -1 });
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
    const imageUrlArray = restaurant.imageURl || [];
    return Restaurants.findByIdAndUpdate(
      restaurant._id,
      {
        $set: {
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          openTime: restaurant.opens,
          closeTime: restaurant.closes,
          seats: restaurant.seats,
          address: restaurant.address,
          city: restaurant.city,
          pinCode: restaurant.pinCode,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        },
        $addToSet: {
          images: { $each: imageUrlArray },
        },
      },
      { new: true }
    );
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
      category: data.category,
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
          foodCategory: newMenu.foodCategory,
          category: newMenu.category,
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
      })
      .sort({ _id: -1 });
    return orders;
  } catch (err) {
    console.log(err);
  }
};

export const partnerSave = async (data, number, password) => {
  try {
    return await Partners.findOneAndUpdate(
      { phoneNumber: number },
      {
        $set: {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          imageURL: data.imageURL,
          password: password,
        },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const partnerTotalReviewCount = async (restaurantIds) => {
  try {
    const totalCount = await Reviews.countDocuments({
      restaurant: { $in: restaurantIds },
    });
    return totalCount;
  } catch (err) {
    console.log(err);
  }
};

export const totalBookings = async (restaurantIds) => {
  try {
    const totalbooking = await Bookings.countDocuments({
      restaurant: { $in: restaurantIds },
    });
    return totalbooking;
  } catch (err) {
    console.log(err);
  }
};

export const chartData = async (restaurantIds) => {
  try {
    const data = await Bookings.find({ restaurant: { $in: restaurantIds } });
    return data;
  } catch (err) {
    console.log(err);
  }
};
