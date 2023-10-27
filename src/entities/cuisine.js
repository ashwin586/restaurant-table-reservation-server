import mongoose, { Schema } from "mongoose";

const cuisineSchema = new Schema({
  cuisine: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Cuisines", cuisineSchema);
