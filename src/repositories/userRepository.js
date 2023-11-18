import user from "../entities/user.js";
import Restaurants from "../entities/Restaurants.js";
import Menu from "../entities/Menus.js";
import Booking from "../entities/Booking.js";
import Reviews from "../entities/Reviews.js";

export const saveUser = async (userData) => {
  try {
    const newUser = new user({
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      password: userData.password,
    });
    return await newUser.save();
  } catch (err) {
    console.log(err);
  }
};

export const saveGoogleData = async (name, email) => {
  try {
    const newUser = new user({
      name: name,
      email: email,
    });
    return await newUser.save();
    F;
  } catch (err) {
    console.log(err);
  }
};

export const findUser = async (email) => {
  try {
    const result = await user.findOne({ email: email });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const savenewpassword = async (password, userData) => {
  try {
    userData.password = password;
    return await userData.save();
  } catch (err) {
    console.log(err);
  }
};

export const findWithId = async (id) => {
  try {
    return await user.findById(id);
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

export const findRestaurants = async () => {
  try {
    return await Restaurants.find({ isApproved: "Approved" });
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

export const saveBooking = async (userId, data, total) => {
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
    return await newBooking.save();
  } catch (err) {
    console.log(err);
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
    ]);
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
