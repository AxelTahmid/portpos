## Project Structure

- app contains all separated features
- handlers => app logic only => request sanitization & response data, anonymous functions only
- services => business logic only => database & cache operations, arrow functions only
- schemas => request validation & response serialization

## Installation Steps

### Local: Node - lts ( 16.xx or 18.xx ).

create `.env` from `.env.example` file and replace with necessary values. You will need a MySQL or MariaDB database.

```
npm install

npm run key

npm run sql

npm run dev
```

### Docker :

this is a production image build, no pretty logs. you will need to provide necessary env values before building image.

```
docker build . -t fastifyapp
docker run -d -p 3000:3000 --name fastifyapp fastifyapp
```
