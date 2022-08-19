import express from 'express';
import config from './config/index.js';
import routerAPI from './routes/index.js';
import { errorHandler, logErrors, wrapErrors } from './utils/middlewares/errorHandlers.js';
import notFoundHandler from './utils/middlewares/notFoundHandler.js';

const app = express();

//Middlewares
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
  console.log(`Listening http://localhost:${config.port}`);
});

export default app;
