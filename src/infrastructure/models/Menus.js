import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  foodCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurants",
    required: true,
  },
});

export default mongoose.model("Menu", menuSchema);
