const { MongoError } = require('mongodb');

const isDuplicateMongoError = (error) =>
  error instanceof MongoError && error.code === 11000;

const ClientError = (message, statusCode = 400, payload = null) => {
  return { message, statusCode, payload };
};

module.exports = { isDuplicateMongoError, ClientError };
