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

module.exports = {
  createJwtToken,
  verifyJwtToken,
};
