import boom from '@hapi/boom';
//import joi from 'joi';

const validate = (data, schema) => {
  //const { error } = joi.object(schema).validate(data);
  const { error } = schema.validate(data);
  return error;
};

const validationHandler = (schema, check = "body") => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next()
  };
};

export default validationHandler;
