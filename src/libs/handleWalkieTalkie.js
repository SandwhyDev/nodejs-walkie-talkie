// const userCountsByRoom = {};

const handleWakieTalkie = (socket, io) => {
  socket.on("join-room-walkie-talkie", (user, roomId) => {
    // socket.leaveAll(); // Keluar dari semua room sebelumnya

    console.log(`user ${user} masuk kke room ${roomId}`);

    socket.join(roomId);

    socket.emit("joining", `anda masuk ke room ${roomId}`);

    socket.removeAllListeners("audioMessage"); // Menghapus listener sebelumnya

    socket.on("audioMessage", (data) => {
      // const roomid = data.split("|")[0];
      // const audio = data.split("|")[1];

      //const buff = Buffer.from(data);

      console.log(data);

      socket.broadcast.to(roomId).emit("audioFinal", data);
    });

    socket.on("user-out-room", (userOut, idRoom) => {
      socket.leave(idRoom);
    });
  });
};

export default handleWakieTalkie;
