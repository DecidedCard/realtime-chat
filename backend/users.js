const users = [];

// 유저 추가 함수
const addUser = ({ id, name, room }) => {
  console.log(users);

  // 데이터 클리닝 및 유효성 검사
  if (typeof name !== "string" || typeof room !== "string") {
    return { error: "이름과 방은 문자열이어야 합니다." };
  }

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name || !room) return { error: "이름과 방이 필요해요." };

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "이미 존재하는 이름입니다." };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

// 유저 제거 함수
const removeUser = (id) => {
  console.log(users);

  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0]; // 유저 삭제 후 반환
  } else {
    return { error: "유저를 찾을 수 없습니다." }; // 에러 처리
  }
};

// 유저 찾기 함수
const getUser = (id) => {
  console.log(users);

  const user = users.find((user) => user.id === id);
  if (!user) {
    return { error: "유저를 찾을 수 없습니다." };
  }
  return user;
};

// 특정 방에 있는 유저 찾기 함수
const getUsersInRoom = (room) => {
  console.log(users);

  return users.filter((user) => user.room === room.trim().toLowerCase());
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
