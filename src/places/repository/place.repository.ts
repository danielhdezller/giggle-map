import prisma from "../../db/prisma";
import {
  CreatePlace,
  IPlaceRepository,
  Place,
} from "../interfaces/place.interface";

export class PlaceRepository implements IPlaceRepository {
  async createPlace(data: CreatePlace): Promise<Place> {
    try {
      return await prisma.place.create({ data });
    } catch (error) {
      console.error("Error creating a place", error);
      throw error;
    }
  }

  async findPlaceByIdWithDistance(id: number): Promise<Place> {
    try {
    } catch (error) {}
  }

  async findNearbyPlaces(
    lat: number,
    lng: number,
    radius: number
  ): Promise<Place[]> {
    try {
      const radiusInKm = radius / 1000;

      // Rough degree difference from radius in meters
      const latDelta = radius / 111320; // meters per degree latitude
      const lngDelta = radius / (111320 * Math.cos(lat * (Math.PI / 180)));

      const minLat = lat - latDelta;
      const maxLat = lat + latDelta;
      const minLng = lng - lngDelta;
      const maxLng = lng + lngDelta;

      return await prisma.$queryRaw<Place[]>`
        SELECT * FROM (
          SELECT *, 
            (6371 * acos(
                cos(radians(${lat})) * 
                cos(radians(latitude)) * 
                cos(radians(longitude) - radians(${lng})) + 
                sin(radians(${lat})) * sin(radians(latitude))
            )) AS distance
          FROM "Place"
          WHERE latitude BETWEEN ${minLat} AND ${maxLat}
            AND longitude BETWEEN ${minLng} AND ${maxLng}
        ) AS subquery
        WHERE distance < ${radiusInKm}
        ORDER BY distance ASC;
      `;
    } catch (error) {
      console.error("Error querying nearby places:", error);
      throw error;
    }
  }

  async findById(id: string): Promise<Place | null> {
    try {
      return await prisma.place.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error querying place by id:", error);
      throw error;
    }
  }
}
