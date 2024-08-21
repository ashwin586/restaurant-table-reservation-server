import express from "express";
import session from "express-session";
import connectDB from "./config/mongo.js";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoute from "./frameworks/routes/userRoutes.js";
import adminRoutes from "./frameworks/routes/adminRoutes.js";
import partnerRoutes from "./frameworks/routes/partnerRoutes.js";
import { corsConfig } from "./config/cors.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(`${req.method}, ${req.url}`);
//   next();
// });

app.use(cors(corsConfig));

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
app.use("/partner", partnerRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is connected to the port ${process.env.PORT}`);
});
