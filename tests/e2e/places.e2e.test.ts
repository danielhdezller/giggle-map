import request from "supertest";
import app from "../../src/server";
import prisma from "../../src/db/prisma";

describe("📍 Places End-to-End", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.place.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const placePayload = {
    name: "Eiffel Tower",
    description: "Iconic tower in Paris",
    latitude: 48.8584,
    longitude: 2.2945,
  };

  it("should create a new place", async () => {
    const res = await request(app).post("/api/places").send(placePayload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Eiffel Tower");
  });

  it("should return nearby places within a radius", async () => {
    await prisma.place.create({ data: placePayload });

    const res = await request(app).get(
      `/api/places/nearby?lat=48.8584&lng=2.2945&radius=500`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 400 if lat/lng are missing in nearby query", async () => {
    const res = await request(app).get("/api/places/nearby?radius=1000");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Latitude and longitude are required/);
  });

  it("should get place by ID", async () => {
    const created = await prisma.place.create({ data: placePayload });

    const res = await request(app).get(`/api/places/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(placePayload.name);
  });

  it("should return 404 for non-existent place ID", async () => {
    const res = await request(app).get(`/api/places/non-existent-id`);
    expect(res.statusCode).toBe(404);
  });
});
