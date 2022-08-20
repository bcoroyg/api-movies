import { ExtractJwt, Strategy } from 'passport-jwt';
import boom from '@hapi/boom';
import config from '../../../config/index.js';
import UsersService from '../../../services/users.service.js';

const JwtStrategy = new Strategy(
  {
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (tokenPayload, cb) => {
    const usersService = new UsersService();
    try {
      const user = await usersService.getUser({ email: tokenPayload.email });
      if (!user) {
        return cb(boom.unauthorized(), false);
      };

      delete user.password;


      return cb(null,  { ...user, scopes: tokenPayload.scopes });
    } catch (error) {
      return cb(error);
    }
  }
);

export default JwtStrategy
