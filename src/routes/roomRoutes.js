const { Router } = require('express');
const {
  createRoom,
  getRoom,
  getAllRooms,
} = require('../controllers/roomController');

const roomRouter = Router();

roomRouter.post('/create', createRoom);

roomRouter.get('/get/:id', getRoom);

roomRouter.get('/getAllRooms', getAllRooms);

module.exports = roomRouter;
