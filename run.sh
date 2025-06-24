# Start development environment
docker-compose -f docker-compose.dev.yml up --force-recreate --build -d
docker-compose -f docker-compose.dev.yml logs -f app

# docker-compose -f docker-compose.dev.yml up --force-recreate --build -d