const mockRedis = {
  connect: jest.fn(),
  quit: jest.fn(),
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue("OK"),
  status: "mock",
};

export default mockRedis;
