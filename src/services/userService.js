/* eslint-disable indent */
const bcrypt = require('bcrypt');
const { isDuplicateMongoError, ClientError } = require('../utils/error');
const { verifyJwtToken, createJwtToken } = require('../utils/jwt');
const userModel = require('../models/userModel');
const roomModel = require('../models/roomModel');
const { check } = require('prettier');

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
    return { error: 'Invalid Login' };
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
      return new ClientError(errorMessages.entityAlreadyExist);
    }
    return error;
  }
};

const getUser = async (token) => {
  const authData = verifyJwtToken(token);
  if (!authData) {
    throw new ClientError(validationMessages.invalidAuthorizationToken);
  }

  const user = await userModel.findById(authData.id);

  return user?.toObject();
};

const getAllRooms = async (params) => {
  const ascOrDesc = params.sort_order === 'asc' ? 1 : -1;

  // Pagination and Sort
  const options = {
    page: params.page ? params.page : 1,
    limit: params.paginate ? params.paginate : 10,
    sort:
      params.sort_by === 'price' ? { price: ascOrDesc } : { rating: ascOrDesc },
  };

  // If params are present then only query that param in db
  const query = params.checkInDate
    ? { checkInDate: params.checkInDate }
    : params.checkInHour
    ? { checkInHour: params.checkInHour }
    : params.checkOutDate
    ? { checkOutDate: params.checkOutDate }
    : params.checkOutHour
    ? { checkOutHour: params.checkOutHour }
    : params.minQuery
    ? { minQuery: params.minQuery }
    : params.maxQuery
    ? { maxQuery: params.maxQuery }
    : params.amenitiesQuery
    ? { amenitiesQuery: params.amenitiesQuery }
    : {};

  const roomsPaginated = roomModel.paginate(query, options, (err, result) => {
    if (err) {
      throw new ClientError(err);
    }

    return result;
  });

  return roomsPaginated;
};

module.exports = {
  login,
  register,
  getUser,
  getAllRooms,
};
