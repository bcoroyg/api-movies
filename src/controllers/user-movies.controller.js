import { Router } from "express";
import UserMoviesService from "../services/user-movies.service.js";
import validationHandler from "../utils/middlewares/validationHandler.js";
import { createUserMovieSchema, userMovieIdSchema } from "../utils/schemas/userMovies.js";
import { userIdSchema } from "../utils/schemas/users.js";

const router = Router();

const userMoviesService = new UserMoviesService();

router.get(
  '/',
  validationHandler(userIdSchema, "query"),
  async (req, res, next) => {
    const { userId } = req.query;

    try {
      const userMovies = await userMoviesService.getUserMovies({ userId });

      res.status(200).json({
        data: userMovies,
        message: 'user movies listed'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createUserMovieSchema),
  async (req, res, next) => {
    const { body: userMovie } = req;

    try {
      const createdUserMovieId = await userMoviesService.createUserMovie({
        userMovie
      });

      res.status(201).json({
        data: createdUserMovieId,
        message: 'user movie created'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:userMovieId',
  validationHandler(userMovieIdSchema, 'params'),
  async (req, res, next) => {
    const { userMovieId } = req.params;

    try {
      const deletedUserMovieId = await userMoviesService.deleteUserMovie({
        userMovieId
      });

      res.status(200).json({
        data: deletedUserMovieId,
        message: 'user movie deleted'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
