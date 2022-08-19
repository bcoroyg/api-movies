import { MongoClient } from 'mongodb';
import config from '../config/index.js';

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_PORT = config.dbPort;
const DB_HOST = config.dbHost;

const DB_URI = () => {
  if (config.dev) {
    return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
  } else {
    return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
  };
}

const MONGO_URI = DB_URI();

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  };

  connect() {
    //patrón singleton
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          };
        });
        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName))
      })
    };
    return MongoLib.connection;
  };
};

export default MongoLib;
