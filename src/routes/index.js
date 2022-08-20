import { Router } from "express";
import moviesController from '../controllers/movies.controller.js';
import userMoviesController from '../controllers/user-movies.controller.js'
import authController from '../controllers/auth.controller.js';
//passport
import '../utils/auth/index.js';

const routerAPI = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/auth', authController);
  router.use('/movies', moviesController);
  router.use('/user-movies', userMoviesController);
};

export default routerAPI;
