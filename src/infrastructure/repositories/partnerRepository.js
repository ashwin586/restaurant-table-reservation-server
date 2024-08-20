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

  fetchAllPartnerRestaurants: async (id) => {
    try {
      return await Restaurants.find({ partner: id })
        .populate("cuisine")
        .sort({ _id: -1 });
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchRestsTotalReviews: async (ids) => {
    try {
      const totalCount = await Reviews.countDocuments({
        restaurant: { $in: ids },
      });
      return totalCount;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchRestsTotalBooking: async (ids) => {
    try {
      const totalbooking = await Bookings.countDocuments({
        restaurant: { $in: ids },
      });
      return totalbooking;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchRestsChartData: async (ids) => {
    try {
      const data = await Bookings.find({ restaurant: { $in: ids } });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchAllCategories: async () => {
    try {
      return await Categories.find();
    } catch (err) {
      throw new Error(err);
    }
  },

  addMenu: async (createdMenu) => {
    try {
      const newMenu = new Menu(createdMenu);
      return await newMenu.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllRestMenus: async (restId) => {
    try {
      return await Menu.find({ restaurant: restId }).populate("foodCategory");
    } catch (error) {
      throw new Error(error);
    }
  },

  editMenu: async (updatedData, id) => {
    try {
      return await Menu.findByIdAndUpdate(id, { $set: updatedData });
    } catch (error) {
      throw new Error(error);
    }
  },

  findMenuById: async (id) => {
    try {
      return await Menu.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchRestOrders: async (restId) => {
    try {
      const orders = await Bookings.find({ restaurant: restId })
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
      throw new Error(err);
    }
  },

  editPartner: async (updatedField, id) => {
    try {
      await Partners.findByIdAndUpdate(id, { $set: updatedField });
    } catch (error) {
      throw new Error(err);
    }
  },

  saveRestaurant: async (newRest) => {
    try {
      const restModel = new Restaurants(newRest);
      await restModel.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllCuisines: async () => {
    try {
      return await Cuisines.find();
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchRestaurant: async (id) => {
    try {
      return await Restaurants.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },

  editRestaurant: async (rest, id) => {
    try {
      await Restaurants.findByIdAndUpdate(id, { $set: rest });
    } catch (error) {
      throw new Error(error);
    }
  },
};
