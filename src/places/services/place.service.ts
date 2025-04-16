import { Place } from "@prisma/client";
import { CreatePlace } from "../interfaces/place.interface";
import { PlaceRepository } from "../repository/place.repository";
import redis from "../../redis/redis";

const placeRepo = new PlaceRepository();

export class PlaceService {
  async createPlace(input: CreatePlace): Promise<Place> {
    return placeRepo.createPlace(input);
  }

  async getNearbyPlaces(
    lat: number,
    lng: number,
    radius: number
  ): Promise<Place[]> {
    const cacheKey = `nearby:${lat}:${lng}:${radius}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const places = await placeRepo.findNearbyPlaces(lat, lng, radius);

    await redis.set(cacheKey, JSON.stringify(places), "EX", 60 * 5);

    return places;
  }

  async getPlaceById(id: string): Promise<Place | null> {
    return placeRepo.findById(id);
  }
}
