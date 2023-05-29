const { verifyJwtToken } = require('../utils/jwt');
const {
  validateObject,
  validationSchemas,
  validationMessages,
} = require('../utils/validation');
const userService = require('../services/userService');
const { ClientError } = require('../utils/error');

const registerUser = async (req, res) => {
  validateObject(validationSchemas.userSchema, req.body);

  const tokens = await userService.register(req.body);

  res.json(tokens);
};

const login = async (req, res) => {
  validateObject(validationSchemas.userSchema, req.body);

  const tokens = await userService.login(req.body.email, req.body.password);

  res.json(tokens);
};

const token = async (req, res) => {
  const newTokens = await userService.updateToken(req.body.refresh_token);
  res.json(newTokens);
};

const updateToken = async (token) => {
  const authData = verifyJwtToken(token);

  if (!authData) {
    res.status(403).send(validationMessages.invalidAuthorizationToken);
  }

  return setAuth(authData.id, authData.role);
};

const getUser = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const user = await userService.getUser(accessToken);
  res.json(user);
};

const getAllRooms = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(403).send('You are not authorized.');
  }

  const accessToken = req.headers.authorization.split(' ')[1];
  const user = await userService.getUser(accessToken);

  const rooms = await userService.getAllRooms(req.body);

  res.json({ userId: user.id, rooms });
};

module.exports = {
  registerUser,
  login,
  getUser,
  updateToken,
  token,
  getAllRooms,
};
