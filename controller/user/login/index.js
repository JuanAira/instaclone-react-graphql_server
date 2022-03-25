const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

const createToken = ({ user, secretKey, expiresIn }) => {
  const {
    id, name, username, email,
  } = user;
  const payload = {
    id, name, username, email,
  };

  return jwt.sign(payload, secretKey, { expiresIn });
};

const login = async ({ input }) => {
  const { email, password } = input;

  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error('The email is incorrect');

  const passwordSuccess = await bcrypt.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error('The password is incorrect');

  return {
    token: createToken({
      user: userFound,
      secretKey: process.env.SECRET_KEY,
      expiresIn: '24h',
    }),
  };
};

module.exports = login;
