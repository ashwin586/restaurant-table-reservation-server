import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisines",
      required: true,
    },
  ],
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: String,
    current: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  address: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partners",
    required: true,
  },
});
export default mongoose.model("Restaurants", restaurantSchema);
