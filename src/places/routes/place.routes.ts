import { Router } from "express";
import {
  createPlace,
  getNearbyPlaces,
  getPlaceById,
} from "../controllers/place.controller";

const placeRoutes = Router();

placeRoutes.post("/", createPlace);
placeRoutes.get("/nearby", getNearbyPlaces);
placeRoutes.get("/:id", getPlaceById);

export default placeRoutes;
