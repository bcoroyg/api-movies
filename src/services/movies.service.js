import { moviesMock } from "../utils/mocks/movies.js";

class MoviesService {

  constructor() {}

  //lista de peliculas
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } }; //eslint-disable-line
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  };

  //mostrar un pelicula
  async getMovie({ movieId }) { //eslint-disable-line
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  };

  //Crear pelicula
  async createMovie({ movie }) { //eslint-disable-line
    const createdMovieId = await Promise.resolve(moviesMock[0].id);
    return createdMovieId;
  };

  //Actualizar Pelicula
  async updateMovie({ movieId, movie } = {}) { //eslint-disable-line
    const updatedMovieId = await Promise.resolve(moviesMock[0].id);
    return updatedMovieId;
  };

  //Eliminar pelicula
  async deleteMovie({ movieId }) { //eslint-disable-line
    const deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return deletedMovieId;
  };

};

export default MoviesService;
