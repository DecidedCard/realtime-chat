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

userController.checkUser = async (token) => {
  const user = await User.findOne({ token });

  if (!user) Error("user not found");

  return user;
};

userController.allUser = async () => {
  const user = await User.find();

  const change = await User.find({ online: true });

  change.online = false;
  change.save();
  console.log(change);

  if (!user) throw new Error("user not found");

  return user;
};

module.exports = userController;
