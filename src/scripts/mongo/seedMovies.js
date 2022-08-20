// DEBUG=app:* node src/scripts/mongo/seedMovies.js

import Debug from 'debug';
import chalk from 'chalk';
import MongoLib from "../../lib/mongo.js";
import { moviesMock } from '../../utils/mocks/movies.js';

//debug
const debug = Debug('app:scripts:movies');

const seedMovies = async () => {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async movie => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} movies have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedMovies();
