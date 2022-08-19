import config from "../config/index.js";

const cacheResponse = (res, seconds) => {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
};

export default cacheResponse;
