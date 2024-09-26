const Chat = require("../db/chat");

const chatController = {};

chatController.saveChat = async (msg, user) => {
  const newMessage = new Chat({
    chat: msg,
    user: {
      id: user._id,
      name: user.name,
    },
  });
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;
