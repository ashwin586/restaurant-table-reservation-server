import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
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
  cart: [
    {
      menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  numberOfSeats: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now(),
  },
  bookedDate: {
    type: Date,
    required: true,
  },
  bookedTime: {
    type: Date,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Cancelled", "Ordered"],
    default: "Ordered"
  }
});

export default mongoose.model("Bookings", bookingSchema);
