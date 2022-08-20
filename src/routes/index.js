import { Router } from "express";
import moviesController from '../controllers/movies.controller.js';
import userMoviesController from '../controllers/user-movies.controller.js'
const routerAPI = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesController);
  router.use('/user-movies', userMoviesController);
};

export default routerAPI;
