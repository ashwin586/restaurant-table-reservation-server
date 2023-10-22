import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: Array,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
    },
  ],
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partners",
    required: true
  }
});

export default mongoose.model('Restaurants', restaurantSchema);
