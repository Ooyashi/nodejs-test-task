const roomService = require('../services/roomService');

const createRoom = async (req, res) => {
  // validateObject(validationSchemas.userSchema, req.body);

  const newRoom = await roomService.createRoom(req.body);

  res.json(newRoom);
};

const getRoom = async (req, res) => {
  // validateObject(validationSchemas.userSchema, req.body);

  const room = await roomService.getRoom(req.params.id);

  res.json(room);
};

module.exports = {
  createRoom,
  getRoom,
};
