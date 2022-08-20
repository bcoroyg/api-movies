import { BasicStrategy as Strategy } from 'passport-http';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import UsersService from '../../../services/users.service.js';

const BasicStrategy = new Strategy(
  async (email, password, cb) => {
    const usersService = new UsersService();
    try {
      const user = await usersService.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      };

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      };

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
);

export default BasicStrategy;
