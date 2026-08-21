#!/bin/bash
set -e

echo "Starting deployment..."

# Navigate to the app directory
cd /home/ec2-user/app

# Read image URI from the file
IMAGE_URI=$(cat imageDetail.json | jq -r '.ImageURI')

echo "Pulling image: $IMAGE_URI"

# Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 238027390572.dkr.ecr.ap-south-1.amazonaws.com

# Pull the image
docker pull $IMAGE_URI

# Run the container
echo "Starting new container..."
docker run -d -p 80:3000 --name api-marketplace-ec2 --restart always $IMAGE_URI

echo "Deployment completed successfully!"