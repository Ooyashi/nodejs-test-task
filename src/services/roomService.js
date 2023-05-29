const roomModel = require('../models/roomModel');
const { ClientError, isDuplicateMongoError } = require('../utils/error');

const createRoom = async (room) => {
  try {
    const newRoom = await roomModel.create(room);

    return newRoom;
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      return new ClientError(errorMessages.entityAlreadyExist);
    }
    return error;
  }
};

const getRoom = async (id) => {
  const room = await roomModel.findById(id);

  if (!room) {
    throw new ClientError('Room not found.', 404);
  }

  return room?.toObject();
};

module.exports = {
  createRoom,
  getRoom,
};
