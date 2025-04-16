import { Place } from "@prisma/client";
import { CreatePlace } from "../interfaces/place.interface";
import { PlaceRepository } from "../repository/place.repository";

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
    return placeRepo.findNearbyPlaces(lat, lng, radius);
  }

  async getPlaceById(id: string): Promise<Place | null> {
    return placeRepo.findById(id);
  }
}
