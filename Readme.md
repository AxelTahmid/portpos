# Portpos Test Repo

The repository contains client and server infrastructure for a simple implementation of order management service integrated with `portpos` payment gateaway, this is not meant for production use.

## Tech Stack

### client -> frontend

- Single Page Application ( SPA )
- Vue.js / Nuxt.js
- Vuex ( state )
- Vuetify ( material ui )
- Axios
- Toast

### server -> backend

- Node.js - Fastify
- Knex.js - MySQL
- Helmet.js
- JWT Auth

## Installation Guide

Please ensure following software installed on your system:

- Node - lts ( v16 or v18) , main runtime env
- Git Bash ( scripts will fail without this )
- MySQL >= v8.0 . Any low will cause conflicts
- VsCode - optional. will help your code readibility. open vscode and in extensions enter `@recommended`, install. All the extensions allow for much better developer experience when browsing server codebase.

### Backend Setup

The backend was generated from my very own starter template pinned to my profile. To start, create `.env` from `.env.example` file and replace with necessary values. Ensure Database values in env file is valid and `NODE_ENV=development`

```
npm install

npm run key ( bash script for generating jwt keys )

npm run sql ( bash script to refresh database and seed )

npm run dev
```

This should start your development server at `localhost:3000`. Default Login is

```
"email" : "admin@portpos.com",
"password" : 123456
```

Full api documentation is hosted at `https://documenter.getpostman.com/view/17110075/2s8Z75S9Rz` . The postman collection is also ready to import at root of this project named `api.postman_collection`

you could containerize this api server using docker as well. The kubernetes manifests are included if you're thinking of deploying to cloud. Github CI also included for using action runners to publish container images to your private docker registry.

this is a production image build, no pretty logs. you will need to provide necessary env values before building image.

```
docker build . -t portpos:api

docker run -d -p 3000:3000 --name portserver portpos:api
```

### Frontend Setup

Frontend is powered by good old Vue.js . Fairly simple to get started

```
npm install

npm run dev
```

This should serve the client at `localhost:3001`. It's a simple Single Page Application. click on the UserIcon to see option for log-out.

The default baseUrl for api server requests are set at `localhost:3000` and port at `3001` . Should be no problem. If you change the ports, you will get a CORS block from server so beware. Only 3000 and 3001 are whitelisted in CORS policy.

once you have everything installed, working but for some reason closed both running servers, you could simply do `bash dev_start.sh` from root of this project to start the apps again.

Credentials are given in Backend Section. Good luck~
