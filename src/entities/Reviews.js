import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurants",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Reviews", reviewSchema);
