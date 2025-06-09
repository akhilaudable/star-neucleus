# Start development environment
docker-compose -f docker-compose.dev.yml up --build -d
docker-compose -f docker-compose.dev.yml logs -f app
