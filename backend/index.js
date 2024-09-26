const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

// CORS 설정: 모든 출처를 허용
app.use(cors({ origin: "*" }));

const io = new Server(httpServer, {
  cors: {
    origin: "*", // 모든 출처 허용
    methods: ["GET", "POST"],
    credentials: true, // 쿠키 전송 허용 시 설정
  },
});

require("./util/io")(io);

// 서버 시작
httpServer.listen(PORT, () =>
  console.log(`서버가 ${PORT}에서 시작되었습니다.`)
);
