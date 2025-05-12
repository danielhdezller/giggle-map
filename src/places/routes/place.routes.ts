import { Router } from "express";
import {
  createPlace,
  getNearbyPlaces,
  getPlaceById,
  getPlacesDistance,
} from "../controllers/place.controller";

const placeRoutes = Router();

placeRoutes.post("/", createPlace);
placeRoutes.get("/nearby", getNearbyPlaces);
placeRoutes.get("/:id", getPlaceById);
placeRoutes.get("/distance", getPlacesDistance);

export default placeRoutes;
