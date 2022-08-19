import { Router } from "express";
import MoviesService from "../services/movies.service.js";
import validationHandler from "../utils/middlewares/validationHandler.js";
import { createMovieSchema, movieIdSchema, updateMovieSchema } from "../utils/schemas/movies.js";

const router = Router();
const moviesService = new MoviesService;

router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  try {
    const movies = await moviesService.getMovies({ tags });
    res.status(200).json({
      data: movies,
      message: 'movies listed'
    })
  } catch (error) {
    next(error);
  }
});

router.get('/:movieId',
  validationHandler(movieIdSchema, "params"),
  async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movie = await moviesService.getMovie({ movieId })
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validationHandler(createMovieSchema),
  async (req, res, next) => {
    const { body: movie } = req
    try {
      const createdMovieId = await moviesService.createMovie({ movie })
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:movieId',
  validationHandler(movieIdSchema, "params"),
  validationHandler(updateMovieSchema),
  async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req
    try {
      const updateMovieId = await moviesService.updateMovie({ movieId, movie })
      res.status(200).json({
        data: updateMovieId,
        message: 'movie updated'
      })
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:movieId',
  validationHandler(movieIdSchema, "params"),
  async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error);
    }
  }
);

export default router;
