const User = require("../db/user");

const userController = {};

userController.saveUser = async (name, socketId) => {
  let user = await User.findOne({ name });

  if (!user) {
    user = new User({
      name,
      token: socketId,
      online: true,
    });
  }

  user.token = socketId;
  user.online = true;

  await user.save();

  return user;
};

module.exports = userController;
