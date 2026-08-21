#!/bin/bash
echo "Stopping existing container..."
docker stop api-marketplace-ec2 || true
docker rm api-marketplace-ec2 || true
echo "Container stopped"