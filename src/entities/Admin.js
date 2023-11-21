import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Admin", adminSchema);
