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
  roomSchema: Joi.object({
    roomNumber: Joi.number().required(),
    checkInDate: Joi.date().required(),
    checkInHour: Joi.string().required(),
    checkOutHour: Joi.string().required(),
    checkOutDate: Joi.date().required(),
    min: Joi.number().required(),
    max: Joi.number().required(),
    amenities: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    rating: Joi.number().required(),
  }),
  queryString: Joi.object({
    page: Joi.number().optional(),
    paginate: Joi.number().optional(),
    checkInDate: Joi.date().optional(),
    checkInHour: Joi.string().optional(),
    checkOutDate: Joi.date().optional(),
    checkOutHour: Joi.string().optional(),
    min: Joi.number().optional(),
    max: Joi.number().optional(),
    sortBy: Joi.string().valid('price', 'rating').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').optional(),
    amenities: Joi.array().items(Joi.string()),
  }),
  idQueryString: Joi.object({
    id: Joi.string().id().required(),
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
