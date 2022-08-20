import { Router } from "express";
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import ApiKeysService from "../services/api-keys.service.js";
import UsersService from "../services/users.service.js";
import config from "../config/index.js";
import validationHandler from "../utils/middlewares/validationHandler.js";
import { createUserSchema } from "../utils/schemas/users.js";

const router = Router();

const apiKeysService = new ApiKeysService();
const usersService = new UsersService();

router.post('/sign-in',
  async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      return next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          return next(boom.unauthorized());
        }

        req.login(user, { session: false }, async (error) => {
          if (error) {
            return next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            return next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }
);

router.post('/sign-up',
  validationHandler(createUserSchema),
  async (req, res, next) => {
    const { body: user } = req;

    try {
      const createdUserId = await usersService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: 'user created'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
