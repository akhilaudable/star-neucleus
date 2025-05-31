# Build production image
docker-compose -f docker-compose.prod.yml build

# Deploy production
docker-compose -f docker-compose.prod.yml up -d