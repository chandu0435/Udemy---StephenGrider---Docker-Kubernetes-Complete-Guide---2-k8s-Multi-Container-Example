# nick3141/docker-kubernetes-complete-guide-example-2-client
# nick3141/docker-kubernetes-complete-guide-example-2-api
# nick3141/docker-kubernetes-complete-guide-example-2-client

# tag images with their git sha (sha for the current commit)
# so kubectl apply will detect an image change
# and in addition, tag with latest
# so we can use the latest images in development

# build docker files

docker build \
    -t nick3141/docker-kubernetes-complete-guide-example-2-client:latest \
    -t nick3141/docker-kubernetes-complete-guide-example-2-client:$SHA \
    -f ./client/Dockerfile \
    ./client

docker build \
    -t nick3141/docker-kubernetes-complete-guide-example-2-api:latest \
    -t nick3141/docker-kubernetes-complete-guide-example-2-api:$SHA \
    -f ./api/Dockerfile \
    ./api

docker build \
    -t nick3141/docker-kubernetes-complete-guide-example-2-worker:latest \
    -t nick3141/docker-kubernetes-complete-guide-example-2-worker:$SHA \
    -f ./worker/Dockerfile \
    ./worker

# push docker files

docker push nick3141/docker-kubernetes-complete-guide-example-2-client:latest
docker push nick3141/docker-kubernetes-complete-guide-example-2-api:latest
docker push nick3141/docker-kubernetes-complete-guide-example-2-worker:latest

docker push nick3141/docker-kubernetes-complete-guide-example-2-client:$SHA
docker push nick3141/docker-kubernetes-complete-guide-example-2-api:$SHA
docker push nick3141/docker-kubernetes-complete-guide-example-2-worker:$SHA

# apply changes

kubectl apply -f k8s

# set images

kubectl set image \
    deployments/client-deployment \
    client=nick3141/docker-kubernetes-complete-guide-example-2-client:$SHA

kubectl set image \
    deployments/api-deployment \
    api=nick3141/docker-kubernetes-complete-guide-example-2-api:$SHA

kubectl set image \
    deployments/worker-deployment \
    worker=nick3141/docker-kubernetes-complete-guide-example-2-worker:$SHA
