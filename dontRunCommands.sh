docker-compose -f docker-compose.dev.yml down -v
mongodb://myapp_user:app_password@localhost:27017/myapp?authSource=myapp
docker exec -it mongodb mongosh -u root -p temp-root-password

 docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb  
 docker logs mongodb      