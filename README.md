## Full Stack Spring Boot 2021
![Architecture Diagram](https://user-images.githubusercontent.com/29623199/111209413-43aa7800-85cc-11eb-80a0-461a9a417b7b.JPG)

### Jib Maven Plugin
*Jib is a deamonless Maven Plugin for building Docker and OCI Images for Java Applications.*

1) Run Jib Maven plugin and build an Image:
- mvnw jib:dockerBuild -Djib.to.image=fullstack:latest
- mvnw clean install jib:dockerBuild -Djib.to.image=fullstack:latest

1) Run Image as a Container
- docker run --name fullstack -p 8080:8080 fullstack:latest

1) Delete Container with Name fullstack
- docker rm -f fullstack

1) Delete Image with Name fullstack
- docker image rm fullstack

1) View all local Images
- docker image ls

1) View running Containers
- docker ps

1) Build an Image with Jib and push it to Docker Hub
- docker login
- mvnw clean install jib:build -Djib.to.image=michaelxsteinertxcontainer/fullstack-spring-boot-2021:latest

1) Build an Image with Jib and push it to Docker Hub (with Credentials)
- mvnw clean install jib:build -Djib.to.image=michaelxsteinertxcontainer/fullstack-spring-boot-2021:latest -D jib.to.auth.username=.. -Djib.to.auth.password=..

1) Pull an Image from Docker Hub
- docker pull michaelxsteinertxcontainer/fullstack-spring-boot-2021:latest docker run -p 8080:8080 michaelxsteinertxcontainer/fullstack-spring-boot-2021

1) Delete an lokal Image
- docker rm -f contianerid

1) Check which Profile is selected
- mvnw help:ative-profiles

1) Build an Image with a defined Profile *jib-push-to-dockerhub* and push it to DockerHub
- mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=1

1) Build an Image with a defined Profile *jib-push-to-local* and push it to local Docker (Docker-Deamon have to run)
- mvnw clean install -P build-frontend -P jib-push-to-local -Dapp.image.tag=latest

### Docker and Postgres
![Database Network](https://user-images.githubusercontent.com/29623199/111209347-2f667b00-85cc-11eb-986a-00fedcfbf0f6.JPG)


1) Create a Network for the Database
- docker network create db

1) Delete a Network
- docker network rm db

1) Create a Database in the Container using the Network and mouting a Folder
- docker run --name db -p 5432:5432 --network=db -v ${PWD}:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -d postgres:alpine

1) Create a Container PSQL which interact with the Database in the Network (The Network gives the Ability to Container to communicate with each other)

- docker run -it --rm --network=db postgres:alpine psql -h db -U postgres
