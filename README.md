# nolte-challenge

This project is a fitness assistant web application using Next.js, a Postgres database, and LocalStack for S3 storage.

## Requirements

- Docker and Docker Compose installed on your machine.
- A `.env` file following the variables specified in `.env.example`.

## Instructions to run the Project

1. Clone the repository:
```
git clone https://github.com/andresmalvestiti/nolte-challenge.git
cd nolte-challenge
```

2. Create a .env file in the root directory of the project with the environment variables mentioned above.

3. Start the services with Docker Compose:
```
docker-compose up --build
```
4. Access the application in your web browser at http://localhost:3000.

## Services
- `web`: The Next.js application.
- `db`: The Postgres database.
- `localstack`: Service to simulate AWS S3.
- `create-bucket`: Container to create the S3 bucket in LocalStack.

## Volumes
- `postgres-data`: Stores the Postgres database data.
- `localstack-data`: Stores the LocalStack data.

## Useful Commands
- To start the services in the background:
```
docker-compose up -d
```

- To stop the services:
```
docker-compose down
```

- To view the logs of a specific service:
```
docker-compose logs -f <service_name>
```

- To rebuild the service images:
```
docker-compose build
```

## Troubleshooting
### Error: "Database is uninitialized and superuser password is not specified"
Ensure that the PG_DATABASE, PG_USER, and PG_PASSWORD environment variables are correctly set in your `.env` file.

### Error: "Service 'db' failed to build"
Check that the init.sql file exists in the root directory of the project and has the correct permissions.

### Error: "LocalStack not starting properly"
Make sure port 4566 is not being used by another service on your machine. 

### Error: "Bucket creation failed"
If the create-bucket container fails to start, make sure the localstack service is fully up and accessible at http://localhost:4566.

### Error: "'workouts' bucket not exists"
Make sure sure to run the `create-bucket` service once. 