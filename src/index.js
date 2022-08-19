import express from 'express';
import config from './config/index.js';
import routerAPI from './routes/index.js';

const app = express();

//Routes
routerAPI(app);

//server
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
