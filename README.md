# ukmroom

this is a fullstack MERN room renting app.

## Server :

1. Running server side:

- goto server
- `npm i` install all dependencies
- `npm start`

2. File config

- config

  - environment.js - dbURI, port, secret message
  - router.js - route paths
  - secureRoute - secures the path

- controllers
- auth.js - user register and login
- room.js - getting rooms / single room
- users.js - user profile / show edit

- models :
- room.js - room schema
- user.js - user schema

- server.js - main file

## Client :

- creating a next app: `npx create-next-app`
- to run the project `npm run dev`

- creating react app `npx create-react-app ukmaroom `
- UI - Material UI
- `npm install react-router-dom@6` - routing
- Connecting frontend to server, add in package.json in frontend ` "proxy": "http://localhost:4000"`
- Alternatively installing `npm install http-proxy-middleware --save` and creating a src/setupProxy.js file
