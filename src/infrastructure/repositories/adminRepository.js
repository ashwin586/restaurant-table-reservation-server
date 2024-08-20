import Admin from "../models/Admin.js";
import Booking from "../models/Booking.js";
import Partners from "../models/Partners.js";
import Restaurants from "../models/Restaurants.js";
import Cuisines from "../models/cuisine.js";
import Categories from "../models/menuCategories.js";
import users from "../models/user.js";

export const adminRepository = {
  findAdmin: async (email) => {
    try {
      return await Admin.findOne({ email: email });
    } catch (error) {
      throw new Error(error);
    }
  },

  usersCount: async () => {
    try {
      return await users.countDocuments({ accountStatus: false });
    } catch (error) {
      throw new Error(error);
    }
  },

  restaurantsCount: async () => {
    try {
      return await Restaurants.countDocuments({ isBlocked: false });
    } catch (error) {
      throw new Error(error);
    }
  },

  partnersCount: async () => {
    try {
      return await Partners.countDocuments({ accountStatus: false });
    } catch (error) {
      throw new Error(error);
    }
  },

  saveCategory: async (newCategory) => {
    try {
      const newCategoryModel = new Categories(newCategory);
      return await newCategoryModel.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllCategory: async () => {
    try {
      return await Categories.find();
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteCategory: async (id) => {
    try {
      await Categories.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  },

  findCuisine: async (cuisine) => {
    try {
      return Cuisines.findOne({ cuisine: cuisine });
    } catch (error) {
      throw new Error(error);
    }
  },

  saveCuisine: async (newCuisine) => {
    try {
      const newCuisineModel = new Cuisines(newCuisine);
      await newCuisineModel.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAllCuisines: async () => {
    try {
      return Cuisines.find();
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteCuisine: async (id) => {
    try {
      await Cuisines.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

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

export const findAllPartners = async () => {
  try {
    return await Partners.find().lean().sort({ _id: -1 });
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

export const findAllUsers = async () => {
  try {
    return await users.find().sort({ registerDate: -1 });
  } catch (err) {
    console.log(err);
  }
};

export const blockTheUser = async (id) => {
  try {
    return await users.findByIdAndUpdate(
      id,
      { accountStatus: true },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const unBlockTheUser = async (id) => {
  try {
    return await users.findByIdAndUpdate(
      id,
      { accountStatus: false },
      { new: true }
    );
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

export const totalrevenue = async () => {
  try {
    const admin = await Admin.findOne();
    const revenue = admin.revenue;
    return revenue;
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
