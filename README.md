# giggle-map

## Steps to run the project:

1. Generate the .env from the .env.example
2. From root folder then run the commands:

```bash
# Start the project at docker
$ docker-compose up -d
# Set up the prisma schema
$ docker exec -it gigglemap-api npx prisma db push
```

## How to play with the app?

After the setup you can try the app by running these curls:

```bash
# To create the first place:
$ curl -X POST http://localhost:3000/api/places \
-H "Content-Type: application/json" \
-d '{
  "name": "OpenAI HQ",
  "description": "The future of AI",
  "latitude": 37.7749,
  "longitude": -122.4194
}'

# To get the place by nearby:
$ curl "http://localhost:3000/api/places/nearby?lat=37.7749&lng=-122.4194&radius=1000"

# To get the place by id (call first nearby and pick the id(uuid):
curl http://localhost:3000/api/places/<place.id>
```

# Bonus Scope

1. Performance Improvements:

   To handle tens of millions of users with minimal delay, we can optimize the geo-query logic using PostGIS with spatial indexes (like GiST), which are far more efficient than raw Haversine queries. We can also introduce regional caching using Redis to serve frequent queries faster.
   For global usage differences, we could analyze traffic patterns and scale resources dynamically per region—prioritizing high-traffic areas and adjusting caching and load balancing accordingly.

2. Worldwide Availability:

   We can deploy across multiple geographic regions using a cloud provider like AWS or GCP. A global load balancer (e.g., Cloudflare, AWS Global Accelerator) would direct users to the closest region, ensuring low latency. Regional DB read replicas and CDN-level caching would further improve responsiveness.

3. End-to-End Provisioning:

   The entire stack is containerized using Docker. With docker-compose, we can spin up Postgres, Redis, and the app with a single command. The test suite connects to a dedicated test DB, runs migrations, and mocks Redis where needed. This setup makes the app easy to test, develop, and deploy anywhere with minimal effort.

4. Security:

   All inputs are validated to avoid injection and malformed requests. The API is designed with HTTPS and can easily integrate JWT-based authentication and role-based access control. Secrets are kept outside the repo using environment variables. On the infrastructure side, firewall rules and private networking help keep internal services secure. This approach is fully implementable and ready for production hardening.

## Stay in touch

- Author - [Daniel Hernández](https://github.com/danielhdezller)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/daniel-hernandez-ller/)

![officer-peña](https://github.com/danielhdezller/nest-sql-base/assets/63543622/626b66cf-457f-4c32-9b53-a7f5d2e68db5)
