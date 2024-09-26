function socket(io) {
  io.on("connection", async (socket) => {
    console.log("새로운 유저가 접속했습니다.", socket.id);

    socket.on("disconnect", () => {
      console.log("유저가 접속을 종료했습니다.");
    });
  });
}

module.exports = socket;
