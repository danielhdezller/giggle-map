export interface Place {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date;
}
export interface CreatePlace
  extends Pick<Place, "name" | "description" | "latitude" | "longitude"> {}

export interface IPlaceRepository {
  createPlace(transaction: CreatePlace): Promise<Place>;
  findNearbyPlaces(lat: number, lng: number, radius: number): Promise<Place[]>;
  findById(id: string): Promise<Place | null>;
}
