import mongoose from "mongoose";

export default async function connectDB() {
  try {
    // await mongoose.connect(process.env.MONGOURL);
    await mongoose.connect(
      "mongodb+srv://ashwinv586:gfCv29kaIREk3Lq1@shoehub-cluster.0qyqyz1.mongodb.net/ReserveTable?retryWrites=true&w=majority"
    );

    console.log("connected to Database");
  } catch (err) {
    console.log(err);
  }
}
