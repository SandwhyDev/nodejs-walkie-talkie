const usersInRoom = {};

const handleWakieTalkie = (socket, io) => {
  socket.on("join-room-walkie-talkie", (user, roomId) => {
    console.log("woi");

    if (!user || !roomId) {
      console.error("Invalid user or roomId");
      return;
    }

    console.log(`User ${user} masuk ke room ${roomId}`);

    usersInRoom[roomId] = usersInRoom[roomId] || [];
    usersInRoom[roomId].push(user);

    console.log(usersInRoom);

    socket.join(roomId);
    socket.emit("joining", `Anda masuk ke room ${roomId}`);

    socket.on("audioMessage", (data) => {
      console.log(data);
      socket.broadcast.to(roomId).emit("audioFinal", data);
    });

    socket.on("user-out-room", (userOut, idRoom) => {
      if (usersInRoom[idRoom]) {
        usersInRoom[idRoom] = usersInRoom[idRoom].filter((u) => u !== userOut);

        // Hapus room dari objek jika tidak ada user lagi
        if (usersInRoom[idRoom].length === 0) {
          delete usersInRoom[idRoom];
        }

        socket.leave(idRoom);
        console.log(`User ${userOut} keluar dari room ${idRoom}`);
      }
    });
  });
};

export default handleWakieTalkie;
