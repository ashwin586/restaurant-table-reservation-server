import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("connected to Database");
  } catch (err) {
    console.log(err);
  }
}
