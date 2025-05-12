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
    const cached: string | null = await redis.get(cacheKey);
    if (cached && cached !== null && JSON.parse(cached).length) {
      return JSON.parse(cached);
    }

    const places = await placeRepo.findNearbyPlaces(lat, lng, radius);

    await redis.set(cacheKey, JSON.stringify(places), "EX", 60 * 5);

    return places;
  }

  async findPlaceByIdWithDistance(
    idMainPlace: string,
    idPlaceTarget: string
  ): Promise<number> {
    const mainPlace = await this.getPlaceById(idMainPlace);
    const placeTarget = await this.getPlaceById(idPlaceTarget);

    const placeTargetRadians = placeTarget.latitude * (Math.PI / 180);
    const placeTargetRadiansLongitude = placeTarget.longitude * (Math.PI / 180);
    const mainPlaceRadiansLatitude = mainPlace.latitude * (Math.PI / 180);
    const mainPlaceRadiansLongitude = mainPlace.longitude * (Math.PI / 180);

    const distance =
      6371 *
      Math.acos(
        Math.cos(
          mainPlaceRadiansLatitude *
            Math.cos(placeTargetRadians) *
            Math.cos(
              placeTargetRadiansLongitude -
                mainPlaceRadiansLongitude +
                Math.sin(
                  mainPlaceRadiansLatitude * Math.sin(placeTargetRadians)
                )
            )
        )
      );

    return distance;
  }

  async getPlaceById(id: string): Promise<Place> {
    const place = await placeRepo.findById(id);
    if (!place) {
      throw new Error(`Not found place by id: ${id}.`);
    }
    return place;
  }
}
