import mongose from "mongoose";

const otpSchema = new mongose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 30,
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

export default mongose.model("Otp", otpSchema);
