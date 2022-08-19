import { Router } from "express";
import moviesController from '../controllers/movies.controller.js';
const routerAPI = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesController);
};

export default routerAPI;
