import MongoLib from "../lib/mongo.js";

class MoviesService {

  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  //lista de peliculas
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  };

  //mostrar un pelicula
  async getMovie({ movieId }) {
    const movie = await this.mongoDB.getOne(this.collection, movieId);
    return movie || {};
  };

  //Crear pelicula
  async createMovie({ movie }) {
    const createdMovieId = await this.mongoDB.create(this.collection, movie);
    return createdMovieId;
  };

  //Actualizar Pelicula
  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
    return updatedMovieId;
  };

  //Eliminar pelicula
  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  };

};

export default MoviesService;
