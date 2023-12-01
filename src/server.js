import express from "express";
import session from "express-session";
import connectDB from "./config/mongo.js";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoute from "./interfaces/routes/userRoutes.js";
import adminRoutes from "./interfaces/routes/adminRoutes.js";
import { v4 as uuidv4 } from "uuid";
import partnerRoutes from "./interfaces/routes/partnerRoutes.js";
dotenv.config();

const allowedOrigins = ['https://d2y3w40euj04vp.cloudfront.net/'];

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // origin: function (origin, callback) {
    //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use("/", userRoute);
app.use("/admin", adminRoutes);
app.use('/partner', partnerRoutes);
connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`server is connected to the port ${process.env.PORT}`);
// });

app.listen(5000, () => {
  console.log(`server is connected to the port ${5000}`);
});