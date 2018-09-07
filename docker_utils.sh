#!/bin/sh
echo $1

REPOSITORY=bcbi
IMAGE_NAME=solrplant_web_app

# Bail if we're on a dirty git tree
if ! git diff-index --quiet HEAD; then
    echo "You have uncommited changes. Please commit them before building and"
    echo "populating. This helps ensure that all docker images are traceable"
    echo "back to a git commit."
    exit 1
fi


if TRAVIS; then
   echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
   TAG=${TRAVIS_TAG}
else
   #Get the tag from 
    GIT_REV=$(git log -n 1 --pretty=format:%h)
    TAG="${GIT_REV}"
fi

echo "Tag: ${TAG}"

if [ "$1" == "build-and-push" ]; then
    docker build -f Dockerfile --tag=${REPOSITORY}/${IMAGE_NAME}:${TAG} .
    docker push ${REPOSITORY}/${IMAGE_NAME}:${TAG}
    docker tag ${REPOSITORY}/${IMAGE_NAME}:${TAG} ${REPOSITORY}/${IMAGE_NAME}:latest
    docker push ${REPOSITORY}/${IMAGE_NAME}:latest
    echo "Pushed ${REPOSITORY}/${IMAGE_NAME}:${TAG} and :latest"
elif [ "$1" == "run-dev" ]; then
    docker run -p 5050:5050 --name ${IMAGE_NAME} ${REPOSITORY}/${IMAGE_NAME}
elif [ "$1" == "rm" ]; then
    docker rm ${IMAGE_NAME}
else
    echo "First argument must be one of the following strings: build-and-push, run-dev, rm"
fi
