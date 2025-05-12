import { Request, Response } from "express";
import { PlaceService } from "../services/place.service";

const placeService = new PlaceService();

export const createPlace = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const place = await placeService.createPlace(req.body);
    res.status(201).json(place);
  } catch (error) {
    console.error("Error creating a place", error);
    res.status(500).json({ error: "Error creating place" });
  }
};

export const getNearbyPlaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ error: "Latitude and longitude are required" });
    return;
  }

  try {
    const places = await placeService.getNearbyPlaces(
      Number(lat),
      Number(lng),
      Number(radius) || 1000
    );

    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching nearby places", error);
    res.status(500).json({ error: "Error fetching nearby places" });
  }
};

export const getPlacesDistance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idMainPlace, idPlaceTarget } = req.query;

    if (
      !idMainPlace ||
      !idPlaceTarget ||
      typeof idMainPlace !== "string" ||
      typeof idPlaceTarget !== "string"
    ) {
      throw new Error(
        `The parameters idMainPlace and idPlaceTarget must be defined.`
      );
    }

    const place = await placeService.findPlaceByIdWithDistance(
      idMainPlace,
      idPlaceTarget
    );
    if (!place) {
      res.status(404).json({ error: "Place not found" });
      return;
    }
    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching a place by id", error);
    res.status(500).json({ error: "Error fetching place" });
  }
};

export const getPlaceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const place = await placeService.getPlaceById(req.params.id);
    if (!place) {
      res.status(404).json({ error: "Place not found" });
      return;
    }
    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching a place by id", error);
    res.status(500).json({ error: "Error fetching place" });
  }
};
