const { MongoError } = require('mongodb');

class ClientError extends Error {
  constructor(message, statusCode, payload) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.payload = payload;
  }
}
const isDuplicateMongoError = (error) =>
  error instanceof MongoError && error.code === 11000;

const errorMessages = {
  userNotFound: 'User not found.',
  roomNotFound: 'Room not found.',
  incorrectCredentials: 'Email or password are incorrect. Please, try again.',
  entityAlreadyExists:
    'The entity already exists. Try again with different data.',
};

module.exports = { isDuplicateMongoError, ClientError, errorMessages };
