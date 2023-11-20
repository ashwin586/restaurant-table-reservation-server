import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  revenue: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Admin", adminSchema);
