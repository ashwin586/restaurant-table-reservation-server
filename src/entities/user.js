import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  accountStatus: {
    type: Boolean,
    default: false,
  },
  userImage: {
    type: String,
  },
  registerDate: {
    type: String,
    default: Date.now(),
  },
});

export default mongoose.model("users", userSchema);
