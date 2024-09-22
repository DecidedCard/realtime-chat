const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// CORS 설정: 모든 출처를 허용
app.use(cors({ origin: "*" }));

const io = socketio(server, {
  cors: {
    origin: "*", // 모든 출처 허용
    methods: ["GET", "POST"],
    credentials: true, // 쿠키 전송 허용 시 설정
  },
});

// 라우터 설정
app.use(router);

io.on("connection", (socket) => {
  console.log("새로운 유저가 접속했습니다.");

  // 유저가 방에 조인할 때
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      console.log(error);
      return callback({ error: error }); // 오류가 발생한 경우
    }

    // 관리자 메시지 전송: 환영 메시지
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, ${user.room}에 오신 것을 환영합니다.`,
    });

    // 모든 유저에게 방 정보 전송
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // 유저를 방에 추가
    socket.join(user.room);

    callback(); // 성공적인 연결 후 콜백 호출
  });

  // 유저가 메시지를 보낼 때
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (user && user.room) {
      // 해당 방에 메시지를 보냄
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    }

    callback(); // 메시지 전송 후 콜백
  });

  // 유저가 방을 떠날 때
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      // 방에 있는 다른 유저에게 알림
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}님이 퇴장하셨습니다.`,
      });

      // 방의 유저 리스트 업데이트
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }

    console.log("유저가 나갔습니다.");
  });
});

// 서버 시작
server.listen(PORT, () => console.log(`서버가 ${PORT}에서 시작되었습니다.`));
