import joi from 'joi';

const userId = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userIdSchema = joi.object({
  userId: userId
});

const userSchema = {
  name: joi
    .string()
    .max(100)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required()
};

const createUserSchema = joi.object({
  ...userSchema,
  isAdmin: joi.boolean()
});

const createProviderUserSchema = joi.object({
  ...userSchema,
  apiKeyToken: joi.string().required()
});

export {
  userId,
  userIdSchema,
  createUserSchema,
  createProviderUserSchema
}
