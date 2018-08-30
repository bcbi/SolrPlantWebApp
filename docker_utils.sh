#!/bin/sh
echo $1

if [ "$1" == "build" ]; then
    # clean up local dirs and build
    rm -rfv client/build
    rm -rfv client/node_modules
    rm client/package-lock.json
    docker build -f Dockerfile --tag=bcbi/solrplant_web_app .
elif [ "$1" == "run" ]; then
    docker run -d -p 5050:5050 --restart always --name solrplant_web_app bcbi/solrplant_web_app
elif [ "$1" == "run-dev" ]; then
    docker run -p 5050:5050 --name solrplant_web_app bcbi/solrplant_web_app
elif [ "$1" == "push" ]; then
    docker push bcbi/solrplant_web_app
elif [ "$1" == "pull" ]; then
    docker pull bcbi/solrplant_web_app
elif [ "$1" == "rm" ]; then
    docker rm solrplant_web_app
else
    echo "First argument must be one of the following strings: build, run, run-dev, push, pull, rm"
fi
