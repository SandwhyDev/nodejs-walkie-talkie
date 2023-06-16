// const userCountsByRoom = {};

const handleWakieTalkie = (socket, io) => {
  socket.on("join-room-walkie-talkie", (user, roomId) => {
    // socket.leaveAll(); // Keluar dari semua room sebelumnya

    console.log(`user ${user} masuk kke room ${roomId}`);

    socket.join(roomId);

    socket.emit("joining", `anda masuk ke room ${roomId}`);

    socket.removeAllListeners("audioMessage"); // Menghapus listener sebelumnya

    socket.on("audioMessage", (data, room) => {
      // console.log("room id ", room);
      console.log(room, data);

      // console.log(room);

      socket.broadcast.to(room).emit("audioFinal", ` ${data}`);
    });

    socket.on("user-out-room", (userOut, idRoom) => {
      socket.leave(idRoom);
    });
  });
};

export default handleWakieTalkie;
