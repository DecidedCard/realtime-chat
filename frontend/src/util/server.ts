import { io } from "socket.io-client";

const socket = io("http://192.168.219.105:5000");

export default socket;
