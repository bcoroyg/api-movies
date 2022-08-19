import assert from 'assert';
import app from '../index.js';
import { moviesMock } from '../utils/mocks/movies.js';
import testServer from '../utils/testServer.js';


describe('routes - movies', function() {

  const request = testServer(app);
  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/v1/movies').expect(200, done);
    });

    it('should respond with the list of movies', function(done) {
      request.get('/api/v1/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });
  });
});
