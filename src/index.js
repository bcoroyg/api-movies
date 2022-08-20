import express from 'express';
import helmet from 'helmet';
import Debug from "debug";
import config from './config/index.js';
import routerAPI from './routes/index.js';
import { errorHandler, logErrors, wrapErrors } from './utils/middlewares/errorHandlers.js';
import notFoundHandler from './utils/middlewares/notFoundHandler.js';
const debug = Debug("app:server");

const app = express();


//Middlewares
// Helmet
app.use(helmet());

//Body-parser (json)
app.use(express.json());

//Routes
routerAPI(app);

//Middleware error 404
app.use(notFoundHandler);

//Middlewares de Errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//server
app.listen(config.port, () => {
  debug(`Listening http://localhost:${config.port}`);
});

export default app;
