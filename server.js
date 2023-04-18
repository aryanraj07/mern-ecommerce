import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configure env
dotenv.config();
//database config
connectDB();
//rest object
const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  res.send("<h1>home</h1>");
});
//rest api

app.use("*", function (req, res) {
  res.sendFile(join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;
//run listen
app.listen(PORT, () => {
  // console.log(`Seerver Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});
