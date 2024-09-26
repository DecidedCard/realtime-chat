function socket(io) {
  io.on("connection", async (socket) => {
    console.log("새로운 유저가 접속했습니다.", socket.io);
  });
}

module.exports = socket;
