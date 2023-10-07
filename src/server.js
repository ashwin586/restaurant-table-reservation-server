import express from "express";
import connectDB from "./config/mongo.js";
import cors from "cors";
import dotenv from 'dotenv';
import userRoute from "./interfaces/routes/userRoutes.js";
import adminRoutes from "./interfaces/routes/adminRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({extended: true }));
app.use(express.urlencoded());


app.use('/', userRoute);
app.use('/admin', adminRoutes);

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is connected to the port ${process.env.PORT}`);
});
