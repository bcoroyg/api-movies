import boom from '@hapi/boom';

const validate = () => {
  return false;
};

const validationHandler = (schema, check = "body") => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next()
  };
};

export default validationHandler;
