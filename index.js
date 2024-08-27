import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------- ROUTES ---------- */
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

/* ---------- ROUTES SETUP ---------- */
authRoutes(app);
userRoutes(app);

/* --------- CORS SETUP --------- */
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: process.env.ALLOWED_METHODS,
  allowedHeaders: process.env.ALLOWED_HEADERS,
  credentials: process.env.ALLOWED_CREDENTIALS === "true",
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

/* ---------- ERROR HANDLING ---------- */
app.use(errorMiddleware);

/* ---------- SERVER SETUP ---------- */
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`App is up and running on ${bind}`);
  console.log(`Click here - http://${os.hostname()}:${addr.port}`);
  console.log(`App running in ${process.env.NODE_ENV} mode`);
});
