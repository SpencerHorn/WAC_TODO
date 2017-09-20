# Watch and code - Todo list
## Build image
docker build -t webserver-image:v1 .
## Run image
docker run -d -p 80:80 webserver-image:v1

open browser to localhost