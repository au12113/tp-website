#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
dockerpath="public.ect.aws/j1g2j9e9/tp-website"

# Step 2
# Run the Docker Hub container with kubernetes
minikube kubectl -- create deployment tp-website-container --image=$dockerpath

# Step 3:
# List kubernetes pods
minikube kubectl -- get pods
export POD_NAME=$(minikube kubectl -- get pods -o=name)
echo $POD_NAME

# Step 4:
# Forward the container port to a host
minikube kubectl -- expose deployment/tp-website-container --type="NodePort" --port=3000,3306
minikube kubectl -- port-forward $POD_NAME 3000:3000 3306:3306
