import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import placeRoutes from "./places/routes/place.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/places", placeRoutes);
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running ✅" });
});

export default app;
