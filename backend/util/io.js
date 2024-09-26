const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

function socket(io) {
  io.on("connection", async (socket) => {
    console.log("새로운 유저가 접속했습니다.", socket.id);

    socket.on("login", async (user, cb) => {
      try {
        const userData = await userController.saveUser(user, socket.id);
        const welcomeMessage = {
          chat: `${user}이 참여하였습니다.`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        io.emit("user", userData);
        cb({ ok: true, data: userData });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        const user = await userController.checkUser(socket.id);

        const newMessage = await chatController.saveChat(message, user);

        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", async () => {
      try {
        const user = await userController.checkUser(socket.id);

        const outMessage = {
          chat: `${user.name}이 접속을 종료하였습니다..`,
          user: { id: null, name: "system" },
        };

        io.emit("message", outMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });
  });
}

module.exports = socket;
