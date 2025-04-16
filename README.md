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

## Stay in touch

- Author - [Daniel Hernández](https://github.com/danielhdezller)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/daniel-hernandez-ller/)

![officer-peña](https://github.com/danielhdezller/nest-sql-base/assets/63543622/626b66cf-457f-4c32-9b53-a7f5d2e68db5)