import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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
