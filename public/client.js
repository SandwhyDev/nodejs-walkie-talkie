// Ambil elemen berdasarkan ID
const statusDiv = document.getElementById("status");
const messagesDiv = document.getElementById("messages");
const BtnDisconnect = document.getElementById("BtnDisconnect");
const BtnJoinRoom = document.getElementById("BtnJoinRoom");
const BtnLeaveRoom = document.getElementById("BtnLeaveRoom");

// const username = ;
const socket = io();

socket.auth = { name: "sandy" };

// Koneksi socket.io
socket.on("connect", () => {
  console.log("Connected to server");
  statusDiv.textContent = "Status: Connected";
  BtnDisconnect.textContent = "Disconnect";
});

socket.on("disconnect", () => {
  console.log("disconnect from server");
  statusDiv.textContent = "Status: disconnect";
  BtnDisconnect.textContent = "Connected";
});

BtnDisconnect.addEventListener("click", () => {
  if (socket.connected) {
    console.log("tas");

    socket.disconnect();
  } else {
    socket.connect();

    console.log("tus");
  }
});

function generateRandomName() {
  const firstNames = [
    "Aiden",
    "Sophia",
    "Jackson",
    "Emma",
    "Liam",
    "Olivia",
    "Lucas",
    "Ava",
    "Noah",
    "Isabella",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Martinez",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function generateUID(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i++) {
    uid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uid;
}

BtnJoinRoom.addEventListener("click", () => {
  const name = generateRandomName();
  const uid = generateUID();

  console.log("ea ", name, uid);

  window.localStorage.setItem("uid", uid);
  window.localStorage.setItem("name", name);

  socket.emit("join-room-walkie-talkie", name, uid);
});

BtnLeaveRoom.addEventListener("click", () => {
  const uid = window.localStorage.getItem("uid");
  const name = window.localStorage.getItem("name");

  socket.emit("user-out-room", name, uid);
});
