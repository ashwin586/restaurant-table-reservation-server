import mongoose from "mongoose";
import "../infrastructure/models/Admin.js";
import "../infrastructure/models/Booking.js";
import "../infrastructure/models/Menus.js";
import "../infrastructure/models/Partners.js";
import "../infrastructure/models/Restaurants.js";
import "../infrastructure/models/Reviews.js";
import "../infrastructure/models/cuisine.js";
import "../infrastructure/models/menuCategories.js";
import "../infrastructure/models/user.js";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Database");
  } catch (err) {
    console.log(err);
  }
}
