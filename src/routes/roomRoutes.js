const { Router } = require('express');
const { createRoom, getRoom } = require('../controllers/roomController');

const roomRouter = Router();

roomRouter.post('/create', createRoom);

roomRouter.get('/get', getRoom);

module.exports = roomRouter;
