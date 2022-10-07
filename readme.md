# :musical_note: Echo

Visit website at: http://echo.codingstack.net/

[![Build Status](https://travis-ci.org/dkakashi69/Echo.svg?branch=master)](https://travis-ci.org/dkakashi69/Echo)

A music app made with React + Redux + Nodejs
demo video: (https://www.youtube.com/watch?v=knqfJlnTjtQ)

![image](https://user-images.githubusercontent.com/47851878/124370432-f1d44d80-dca1-11eb-8eca-af7a043191f1.png)


![image](https://user-images.githubusercontent.com/20469909/41728185-5a3e2380-75a0-11e8-8356-fc0a810934eb.png)


## Features
* login to create and listen to your playlists
* download song when you are logged in
* lazy, paginated fetching
* player play/stop/forward/backward track
* search tracks by name and artist

## Installation
### To run the app with Node.js and MongoDB
> This app will fetch tracks from an external api, so there is no need for a database to store tracks, but we still need one for creating user's playlists

Install and start MongoDB (https://docs.mongodb.org/manual/installation).

Install Node.js (http://nodejs.org). Any version above 6.0 works fine

Open .env and adjust the `MONGODB_URI` to your MongoDB server name (localhost normally works if you're running locally).

1. Run `npm install`.

2. Run `npm run dev:client` to start the frontend server

Wait for the build process to complete

![carbon](https://user-images.githubusercontent.com/20469909/41726824-29385c4a-759d-11e8-9c5c-15a48452ad6e.png)

3. Run `npm run dev:server` to start the api server

Navigate to http://localhost:8000 in your browser to explore the app

## Build the app
* Build manually
```
 $ npm start
```
Or
* Build with Docker Compose

```
$ docker-compose build
$ docker-compose up
```

After building the app, frontend and backend servers will be merged into a single server and be available at http://localhost:3000

## Contributors
- [Anh Thi](https://github.com/anhthii)
- [Nguyen Van Quyen Luc](https://github.com/Poseidon-God2k)
