import mongoose, { Schema } from "mongoose";

const PartnersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountStatus: {
    type: Boolean,
    default: false,
  },
  imageURL: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Partners", PartnersSchema);
