# SolrPlantWebApp
Web App to interface with SolrPlant AP

This is the front end of [http://bcbi.brown.edu/solrplant](http://bcbi.brown.edu/solrplant).
The backend is a Julia Server with [GitHub Repository](https://github.com/bcbi/SolrPlantAPI)

This front end is a Single-Page-React Application with the following characteristics:

* Based on create-react-app
* Redux pattern for handling application-state
* ReactRouter for handling routes
* ReactBootstrap for UI
* Redux-Saga for asynchronous tasks

## Live site

This site lives at [http://bcbi.brown.edu/solrplant](http://bcbi.brown.edu/solrplant)

## Contents

1. [Getting this App up and running in developer mode and localhost](#running-in-developer-mode)
2. [Deploy with Docker and NGINX](#deploy-with-docker-and-nginx)

## Running in developer mode

1. First of all [Install or update NVM and Node](https://github.com/bcbi/SolrPlantWebApp/blob/master/INSTALL_NODE.md#install-or-update-nvm-and-node) (if you haven't done so)

2. Clone this repository:

 ```
 git clone https://github.com/bcbi/SolrPlantWebApp.git SolrPlantWebApp
 ```

3. Changes for developemnt

Currently the client submits http requests to a bcbi.brown.edu. When testing locally you may want to run your server locally as well. 

4. Install npm
```
npm install
```

5. Start client
 ```
 
cd YOUR_PATH/SolrPlantWebApp
cd client
npm start
```

The last lines of the output should be

```
Starting the development server...

Compiled successfully!

The app is running at:

  http://localhost:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```
You can now point your browser to http://localhost:3000/!

## Deploy with Docker and NGINX

1. Build image and make it available

    This repository includes a shell script to build, publish and test your docker image. 
    To build the Docker image:

    ```
    cd SolrPlantWebApp

    ./docker_utils.sh "build"
    ```

    The image default name is bcbi/solrplant_web_app and can be pushed into BCBI's docker hub account (if permissions) using 

    ```
    ./docker_utils.sh "push"
    ```


2. Pull image into server

    Assuming your image is now available at DockerHub, you can now pull your image

    ```
    docker pull bcbi/solrplant_web_app
    ```

3. Run image in container

    ```
    docker create -d -p 3000:3000 --restart=always --name solrplant_web_app bcbi/solrplant_web_app
    docker start
    ```

    -d runs in deattached mode.

4. Test in localhost

    At this point the app is available at http://localhost:3000

5. Configure NGINX
    If running in a subdirectory myserver.com/riair, you need to add a new location to your /etc/nginx/nginx.conf 

    ```
    location /solrplant/ {
        	proxy_pass http://127.0.0.1:3000/;
    	}

        }
    }
    ```

    * Note The '/' at the end of the paths is important a it tells nginx to strip it from the calls to out server.



Final considerations:


* Create-react-app scripts need to be aware that you're not in the root directory. To do so, make sure
that in /client/packege.json, you specify it in the homepage field (already done but good to be aware of)

    ```
    "homepage": "http://localhost:3000/solrplant/",
    ```
    This will have the effect that when npm run build is executed the static index.html will correctly set the links to static files, e.g.

    ```
    <link href="/solrplant/static/css/main.4546565.css" rel="stylesheet">
    ```
