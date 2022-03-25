const bcryptjs = require('bcryptjs');
const User = require('../../../models/user');

const register = async ({ input }) => {
  const newUser = input;

  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error('The email already exists');

  const foundUser = await User.findOne({ username });
  if (foundUser) throw new Error('The username already exists');

  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);

  try {
    const user = new User(newUser);

    user.save();
    return user;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = register;
