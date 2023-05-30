const bcrypt = require('bcrypt');
const {
  isDuplicateMongoError,
  ClientError,
  errorMessages,
} = require('../utils/error');
const { verifyJwtToken, createJwtToken } = require('../utils/jwt');
const userModel = require('../models/userModel');

const cryptPass = (password) => {
  const cryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

  return cryptedPassword;
};

const setAuth = async (userId) => {
  const authToken = createJwtToken({ id: userId }, process.env.JWT_DURATION);

  const refreshToken = createJwtToken(
    { id: userId },
    process.env.REFRESH_JWT_DURATION
  );

  return {
    access_token: authToken,
    refresh_token: refreshToken,
  };
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email }).select('+password');
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ClientError(errorMessages.incorrectCredentials);
  }

  return setAuth(user.id);
};

const register = async (user) => {
  user.password = cryptPass(user.password);

  try {
    const newUser = await userModel.create(user);

    return setAuth(newUser.id);
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      throw new ClientError(errorMessages.entityAlreadyExists);
    }
    throw error;
  }
};

const getUser = async (token) => {
  const authData = verifyJwtToken(token);
  if (!authData) {
    throw new ClientError(validationMessages.invalidAuthorizationToken);
  }

  const user = await userModel.findById(authData.id);

  if (!user) {
    throw new ClientError(errorMessages.userNotFound, 404);
  }

  return user.toObject();
};

module.exports = {
  login,
  register,
  getUser,
};
