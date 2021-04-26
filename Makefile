dockerNetwork:
	docker network create vanilla-net

# step 2 : create named volume for db and cache
volume: 
	docker volume create mongovol & docker volume create portainer_data

portainer:
	docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

mongo:
	docker run -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret --network vanilla-net --name mongo mongo

mongoExpress:
	docker run -p 8082:8081 -d -e ME_CONFIG_MONGODB_ADMINUSERNAME=root -e ME_CONFIG_MONGODB_ADMINPASSWORD=secret -e ME_CONFIG_MONGODB_SERVER=mongo -e ME_CONFIG_MONGODB_PORT=27017 --name mongo-express --network vanilla-net mongo-express

apibuilddev:
	cd server && docker build -t penkong/vanillanodemongo -f Dockerfile.dev . 

composeup:
	cd docker && docker-compose -f docker-compose.dev.yaml up -d --build

composedown:
	cd docker && docker-compose -f docker-compose.dev.yaml down

removeAllVolumes:
	docker volume rm $(docker volume ls -q)


# ka == kubectl apply -f 
kuberup:
	cd k8s && kubectl apply -f secrets.k8s.yaml && kubectl apply -f confmap.k8s.yaml && kubectl apply -f .

kuberdown:
	cd k8s && kubectl delete -f .