import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import fs from 'fs/promises';
import util from 'util';
import path from 'path';
import nunjucks from 'nunjucks';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { AddressInfo } from 'net';
// api routes
import userApi from './user/api/user.api';
// page routes
import userRoutes from './user/routes/user.routes';

// configure dotenv and read in .env variables
dotenv.config();
// create the express app server
const app = express();
// set the views to 
app.set('views', path.join(__dirname, 'views'));
// set the templating engine to be nunjucks
app.set('view engine', 'html');
// set express static files, such as js, css, and images
app.use("/public", express.static('public'));
// configure nunjucks.
nunjucks.configure(['src/views/'], { // set folders with templates
  autoescape: true, 
  express: app
});
// use gzip compression for responses returned from the server
app.use(compression());
// set express middleware usage for preventing common http response attacks through setting http headers
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["'self'", "https: data:"]
  }
}));
// set express middleware for allowing cross origin resource sharing
app.use(cors());
// set express middleware for parsing the request body as json and populates the body object of the response
app.use(express.json());

// add the /users route and subroutes
app.use('/users', userRoutes, userApi);

// homepage route
app.get('/', (request: Request, response: Response): void => {
  response.send("Idiot");
  request.params;
});

app.get('/readfile', async (request: Request, response: Response): Promise<void> => {
  const orignailFileContents = await fs.readFile('public/test.txt');
  await fs.writeFile('public/test.txt', 'I am your father');
  const newFileContents = await fs.readFile('public/test.txt');

  response.send(`old file: ${orignailFileContents.toString()} \n new file: ${newFileContents.toString()}`);
});

// 404 Route as last route, captures all page searches outside of the above routes
app.get('*', (request: Request, response: Response): void => {
  response.status(404).send('what???');
});

// create the server and have it listen on a particular route
const server = app.listen(!process.env.PORT ? 3000 : process.env.PORT, () => {
  const host = server.address() as AddressInfo;
  console.log(`App listening on: http://localhost:${host.port}`);
});