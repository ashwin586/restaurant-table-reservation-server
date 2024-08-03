import user from "../models/user.js";
import Restaurants from "../models/Restaurants.js";
import Menu from "../models/Menus.js";
import Booking from "../models/Booking.js";
import Reviews from "../models/Reviews.js";
import Partners from "../models/Partners.js";
import Admin from "../models/Admin.js";

export const userRepository = {
  saveUser: async (User) => {
    try {
      const userModel = new user(User);
      await userModel.save();
    } catch (err) {
      console.log(err);
    }
  },
  findByEmail: async (email) => {
    try {
      return await user.findOne({ email });
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateUser: async (userId, updatedUserData) => {
    try {
      return await user.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export const saveGoogleData = async (name, email) => {
  try {
    const newUser = new user({
      name: name,
      email: email,
    });
    return await newUser.save();
  } catch (err) {
    console.log(err);
  }
};

export const saveUserProfile = async (userData, imageURL) => {
  try {
    if (imageURL) {
      userData.userImage = imageURL;
      return await userData.save();
    }
  } catch (err) {
    console.log(err);
  }
};

export const editProfile = async (data, email) => {
  try {
    return user.findOneAndUpdate({ email: email }, data, { new: true });
  } catch (err) {
    console.log(err);
  }
};

export const findRestaurants = async () => {
  try {
    const restaurants = await Restaurants.find({
      isApproved: "Approved",
      isBlocked: false,
    });
    const populatedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const populatedRestaurant = restaurant.toJSON();
        populatedRestaurant.reviews = await Reviews.find({
          restaurant: restaurant._id,
        });
        return populatedRestaurant;
      })
    );
    return populatedRestaurants;
  } catch (err) {
    console.log(err);
  }
};

export const findRestById = async (id) => {
  try {
    return await Restaurants.findById(id).populate("cuisine");
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

export const restaurantReviews = async (id) => {
  try {
    return await Reviews.find({ restaurant: id }).populate("user");
  } catch (err) {
    console.log(err);
  }
};

export const inventoryManagment = async (cart) => {
  try {
    for (const item of cart) {
      const menuId = item.id;
      const itemQuantity = item.quantity;
      const menu = await Menu.findById(menuId);
      if (menu.quantity) menu.quantity -= itemQuantity;
      await menu.save();
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const saveBooking = async (
  userId,
  data,
  total,
  partnerRevenue,
  adminRevenue
) => {
  try {
    const cartItems = data.cart.map((item) => ({
      menu: item.id,
      quantity: item.quantity,
      total: item.total,
    }));

    const newBooking = new Booking({
      user: userId,
      restaurant: data.restaurantId,
      cart: cartItems,
      numberOfSeats: data.selectedSeats,
      bookedDate: data.date.justDate,
      bookedTime: data.date.dateTime,
      grandTotal: total,
    });
    const restaurant = await Restaurants.findById(newBooking.restaurant);
    if (restaurant) {
      await Partners.findByIdAndUpdate(
        restaurant.partner,
        { $inc: { revenue: partnerRevenue } },
        { $new: true }
      );
    }
    await Admin.findOneAndUpdate({ $inc: { revenue: adminRevenue } });
    return await newBooking.save();
  } catch (err) {
    console.log(err);
  }
};

export const periodBookings = async (restaurantId, bookedDate, bookedTime) => {
  try {
    return await Booking.find({
      restaurant: restaurantId,
      bookedDate,
      bookedTime,
      orderStatus: "Ordered",
    });
  } catch (err) {
    cosnoel.log(err);
  }
};

export const findBookings = async (email) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userBookings",
        },
      },
      {
        $unwind: "$userBookings",
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurantDetails",
        },
      },
      {
        $unwind: "$restaurantDetails",
      },
      {
        $match: {
          "userBookings.email": email,
        },
      },
    ]).sort({ _id: -1 });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const bookingCancel = async (bookingId, userId) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { orderStatus: "Cancelled" } },
      { new: true }
    );
    const total = booking.grandTotal;
    const cancellationFee = 0.15 * total;
    await user.findOneAndUpdate(
      { email: userId },
      { $inc: { "wallet.balance": cancellationFee } },
      { new: true }
    );
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const newReview = async (rating, textReview, restId, userId) => {
  try {
    const existingReview = await Reviews.findOne({
      user: userId,
      restaurant: restId,
    });
    if (existingReview) {
      const existingReviewId = existingReview._id;
      return await Reviews.findByIdAndUpdate(
        existingReviewId,
        { $set: { rating: rating, review: textReview } },
        { new: true }
      );
    } else {
      const review = new Reviews({
        user: userId,
        restaurant: restId,
        rating: rating,
        review: textReview,
      });
      return await review.save();
    }
  } catch (err) {
    console.log(err);
  }
};

export const findingReview = async (restId, userId) => {
  try {
    return await Reviews.findOne({ user: userId, restaurant: restId });
  } catch (err) {
    console.log(err);
  }
};

export const findAllReviews = async (userId) => {
  try {
    return await Reviews.find({ user: userId }).populate("restaurant");
  } catch (err) {
    console.log(err);
  }
};
