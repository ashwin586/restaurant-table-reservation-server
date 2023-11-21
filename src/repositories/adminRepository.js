import Admin from "../entities/Admin.js";
import Booking from "../entities/Booking.js";
import Partners from "../entities/Partners.js";
import Restaurants from "../entities/Restaurants.js";
import Cuisines from "../entities/cuisine.js";
import Categories from "../entities/menuCategories.js";
import users from "../entities/user.js";

export const saveNewAdmin = async (data) => {
  try {
    const newAdmin = new Admin({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return newAdmin.save();
  } catch (err) {
    console.log(err);
  }
};

export const findAdmin = async (adminEmail) => {
  try {
    return await Admin.findOne({ email: adminEmail }).exec();
  } catch (err) {
    console.log(err);
  }
};

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
    return await Restaurants.find().populate("partner").populate("cuisine");
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

export const findAndDeleteCuisine = async (id) => {
  try {
    return await Cuisines.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};

export const saveCategory = async (data) => {
  try {
    const newCategory = new Categories({
      category: data.category,
    });
    return newCategory.save();
  } catch (err) {
    console.log(err);
  }
};

export const findAllCategory = async () => {
  try {
    return await Categories.find();
  } catch (err) {
    console.log(err);
  }
};

export const deletecategory = async (id) => {
  try {
    return await Categories.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};

export const userCount = async () => {
  try {
    return await users.countDocuments({ accountStatus: false });
  } catch (err) {
    console.log(err);
  }
};

export const restaurantOnline = async () => {
  try {
    return await Restaurants.countDocuments({ isBlocked: false });
  } catch (err) {
    console.log(err);
  }
};

export const totalrevenue = async () => {
  try {
    const admin = await Admin.findOne();
    const revenue = admin.revenue;
    return revenue;
  } catch (err) {
    console.log(err);
  }
};

export const partnerCount = async () => {
  try {
    return await Partners.countDocuments({ accountStatus: false });
  } catch (err) {
    console.log(err);
  }
};

export const chartDetails = async () => {
  try {
    const restaurants = await Restaurants.find();
    const restaurantIds = restaurants.map((restaurant) => restaurant._id);
    const bookings = await Booking.find({
      restaurant: { $in: restaurantIds },
    });
    return bookings;
  } catch (err) {
    console.log(err);
  }
};
