import joi from 'joi';
import { movieId } from './movies.js';
import { userId } from './users.js';

const userMovieId = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userMovieIdSchema = joi.object({
  userMovieId: userMovieId
});

const createUserMovieSchema = joi.object({
  userId: userId,
  movieId: movieId
});

export {
  userMovieIdSchema,
  createUserMovieSchema,
}
