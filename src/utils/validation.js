const Joi = require('joi');
const { ClientError } = require('./error');

const validationMessages = {
  invalidLogin: 'Invalid email or password',
  invalidAuthorizationToken: 'Invalid authorization token',
  invalidInput: 'Invalid input',
  invalidDataType: 'Invalid data type',
};

const validationSchemas = {
  userSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const validateObject = (validationSchema, params) => {
  if (!validationSchema) {
    throw new Error(validationMessages.invalidDataType);
  }

  const { error } = validationSchema.validate(params);
  if (error) {
    throw new ClientError(validationMessages.invalidInput, 400, error);
  }
};

module.exports = {
  validationMessages,
  validationSchemas,
  validateObject,
};
