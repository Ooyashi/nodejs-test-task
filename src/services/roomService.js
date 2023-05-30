const roomModel = require('../models/roomModel');
const {
  ClientError,
  isDuplicateMongoError,
  errorMessages,
} = require('../utils/error');

const createRoom = async (room) => {
  try {
    const newRoom = await roomModel.create(room);

    return newRoom.toObject();
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      throw new ClientError(errorMessages.entityAlreadyExists);
    }
    throw error;
  }
};

const getRoom = async (id) => {
  const room = await roomModel.findById(id);

  if (!room) {
    throw new ClientError(errorMessages.roomNotFound, 404);
  }

  return room.toObject();
};

const getAllRooms = async (params) => {
  const { page, paginate, sortBy, sortOrder, ...query } = params;

  const orders = {
    asc: 1,
    desc: -1,
  };

  const sorts = {
    price: { price: orders[sortOrder] },
    rating: { rating: orders[sortOrder] },
  };

  // Pagination and Sort
  const options = {
    page: page ? page : 1,
    limit: paginate ? paginate : 10,
    sort: sorts[sortBy],
  };

  const roomsPaginated = roomModel.paginate(query, options, (err, result) => {
    if (err) {
      throw new ClientError(err, 400);
    }

    return result;
  });

  return roomsPaginated;
};

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
};
