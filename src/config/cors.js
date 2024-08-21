import * as dotenv from "dotenv";
dotenv.config();

export const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || process.env.ALLOWEDORIGINS.includes(origin))
      callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: "GET,HEAD,PUT,POST,DELETE",
  credentials: true,
};
 