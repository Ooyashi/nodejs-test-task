const jwt = require('jsonwebtoken');

const createJwtToken = (data, expirationTime = process.env.JWT_DURATION) => {
  const token = jwt.sign(
    {
      ...data,
    },
    process.env.JWT_SECRET,
    { expiresIn: expirationTime }
  );

  return token;
};

const verifyJwtToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const getAccessToken = (bearerToken) => {
  const accessToken = bearerToken.split(' ')[1];

  return accessToken;
};

module.exports = {
  createJwtToken,
  verifyJwtToken,
  getAccessToken,
};
