const roomService = require('../services/roomService');
const userService = require('../services/userService');
const { getAccessToken } = require('../utils/jwt');
const { validationSchemas, validateObject } = require('../utils/validation');

const createRoom = async (req, res) => {
  validateObject(validationSchemas.roomSchema, req.body);

  const newRoom = await roomService.createRoom(req.body);

  res.json(newRoom);
};

const getRoom = async (req, res) => {
  validateObject(validationSchemas.idQueryString, req.params);

  const room = await roomService.getRoom(req.params.id);

  res.json(room);
};

const getAllRooms = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(403).send('You are not authorized.');
  }

  validateObject(validationSchemas.queryString, req.query);

  const accessToken = getAccessToken(req.headers.authorization);
  const user = await userService.getUser(accessToken);

  const rooms = await roomService.getAllRooms(req.query);

  res.json({ userId: user.id, rooms });
};

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
};
