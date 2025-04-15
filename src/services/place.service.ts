import { PlaceRepository } from "../repository/place.repository";

const placeRepo = new PlaceRepository();

export class PlaceService {
  async createPlace(input: {
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
  }) {
    return placeRepo.createPlace(input);
  }

  async getNearbyPlaces(lat: number, lng: number, radius: number) {
    return placeRepo.findNearbyPlaces(lat, lng, radius);
  }

  async getPlaceById(id: string) {
    return placeRepo.findById(id);
  }
}
