const { Router } = require('express');
const {
  login,
  token,
  registerUser,
  getUser,
  getAllRooms,
} = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/login', login);

userRouter.post('/token', token);

userRouter.post('/register', registerUser);

userRouter.get('/', getUser);

module.exports = userRouter;
